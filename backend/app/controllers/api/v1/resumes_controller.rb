module Api
  module V1
    class ResumesController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :check_rate_limit, only: [:create]
      
      RATE_LIMIT = 5  # requests
      RATE_LIMIT_PERIOD = 900  # 15 minutes in seconds

      def create
        file = params[:file]

        if file.nil?
          render json: { error: 'No file provided' }, status: :bad_request
          return
        end

        # Generate request ID in the backend
        request_id = SecureRandom.uuid
        
        # Send initial status update immediately
        $redis.set("resume_status:#{request_id}", "Starting resume formatting process...")
        
        # Process the resume in a background thread to allow the response to be sent immediately
        Thread.new do
          begin
            latex_content = ResumeFormatterService.new(file, request_id).format
            $redis.set("resume_status:#{request_id}", "Resume formatting completed successfully!")
            $redis.set("resume_result:#{request_id}", { latex: latex_content }.to_json)
          rescue StandardError => e
            error_message = e.message
            $redis.set("resume_status:#{request_id}", "Error: #{error_message}")
          end
        end

        # Return immediately with the request ID
        render json: { request_id: request_id }, status: :accepted
      rescue StandardError => e
        error_message = e.message
        status = case error_message
                when 'No file provided', 'Invalid file type', 'File too large', 'Unsupported file type',
                     'Unable to read DOC file', 'Unable to read DOCX file', 'Not a resume'
                  :bad_request
                when 'Invalid API key'
                  :unauthorized
                when 'Rate limit exceeded'
                  :too_many_requests
                else
                  :internal_server_error
                end

        render json: { error: error_message }, status: status
      end

      def preview
        request_id = params[:request_id]
        
        if request_id.nil?
          render json: { error: 'No request ID provided' }, status: :bad_request
          return
        end

        result_key = "resume_result:#{request_id}"
        pdf_key = "resume_pdf:#{request_id}"
        
        # Try to get cached PDF first
        if cached_pdf = $redis.get(pdf_key)
          Rails.logger.info("Serving cached PDF for request #{request_id}")
          render json: { 
            pdf: Base64.strict_encode64(cached_pdf),
            contentType: 'application/pdf'
          }
          return
        end

        result = $redis.get(result_key)
        if result.nil?
          render json: { error: 'No resume found for this ID' }, status: :not_found
          return
        end

        begin
          parsed_result = JSON.parse(result)
          latex = parsed_result['latex']
          
          # Create a temporary directory with unique name for this request
          dir = Dir.mktmpdir("resume_#{request_id}")
          
          # Write LaTeX content to a file
          tex_file = File.join(dir, 'resume.tex')
          File.write(tex_file, latex)
          
          # Compile LaTeX to PDF with output redirection
          output = `cd #{dir} && pdflatex -interaction=nonstopmode resume.tex 2>&1`
          Rails.logger.info("pdflatex output: #{output}")
          
          # Check if compilation was successful
          unless $?.success?
            Rails.logger.error("PDF compilation failed: #{output}")
            render json: { error: 'Failed to compile PDF' }, status: :internal_server_error
            return
          end
          
          # Read the generated PDF
          pdf_file = File.join(dir, 'resume.pdf')
          if File.exist?(pdf_file)
            pdf_content = File.binread(pdf_file)
            
            # Cache the PDF content with the same expiry as the result
            $redis.set(pdf_key, pdf_content)
            $redis.expire(pdf_key, 3600) # 1 hour expiry
            
            render json: { 
              pdf: Base64.strict_encode64(pdf_content),
              contentType: 'application/pdf'
            }
          else
            Rails.logger.error("PDF file not found after compilation")
            render json: { error: 'Failed to generate PDF' }, status: :internal_server_error
          end
        rescue StandardError => e
          render json: { error: "Failed to generate PDF: #{e.message}" }, status: :internal_server_error
        ensure
          # Clean up temporary directory
          FileUtils.remove_entry dir if dir
        end
      end

      private

      def check_rate_limit
        # Get the original client IP from the X-Forwarded-For header
        ip = request.headers['X-Forwarded-For']&.split(',')&.first || request.remote_ip
        key = "rate_limit:#{ip}"
        count = $redis.get(key).to_i

        if count >= RATE_LIMIT
          Rails.logger.warn("Rate limit exceeded for IP: #{ip}")
          render json: { error: 'Rate limit exceeded. Please try again in an hour.' }, status: :too_many_requests
          return
        end

        # Increment the counter
        if count == 0
          # First request, set expiry
          $redis.setex(key, RATE_LIMIT_PERIOD, 1)
        else
          # Increment existing counter
          $redis.incr(key)
        end
      end
    end
  end
end
