module Api
  module V1
    class ResumesController < ApplicationController
      skip_before_action :verify_authenticity_token
      
      def create
        file = params[:file]
        if file.nil?
          render json: { error: 'No file provided' }, status: :bad_request
          return
        end

        latex_content = ResumeFormatterService.new(file).format
        render json: { latex: latex_content }, content_type: 'application/x-latex'
      rescue StandardError => e
        error_message = e.message
        status = case error_message
                when 'No file provided', 'Invalid file type', 'File too large', 'Unsupported file type',
                     'Unable to read DOC file', 'Unable to read DOCX file'
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
    end
  end
end
