module Api
  module V1
    class StatusController < ApplicationController
      include ActionController::Live

      def events
        response.headers['Content-Type'] = 'text/event-stream'
        response.headers['Last-Modified'] = Time.now.httpdate
        
        sse = SSE.new(response.stream, retry: 300)
        
        begin
          # Keep connection alive
          while true
            if status = $redis.get('resume_status')
              sse.write({ status: status })
              $redis.del('resume_status') # Clear the status after sending
            end
            sleep 0.5
          end
        rescue ClientDisconnected
          # Client disconnected, clean up
        ensure
          sse.close
        end
      end
    end
  end
end 