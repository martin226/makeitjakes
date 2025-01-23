module Api
  module V1
    class ResumesController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :check_rate_limit, only: [:create]
      
      RATE_LIMIT = 5  # requests
      RATE_LIMIT_PERIOD = 3600  # 1 hour in seconds

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

      private

      def check_rate_limit
        ip = request.remote_ip
        key = "rate_limit:#{ip}"
        count = $redis.get(key).to_i

        if count >= RATE_LIMIT
          Rails.logger.warn("Rate limit exceeded for IP: #{ip}")
          raise 'Rate limit exceeded. Please try again in an hour.'
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
