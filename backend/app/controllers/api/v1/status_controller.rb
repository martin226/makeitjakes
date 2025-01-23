module Api
  module V1
    class StatusController < ApplicationController
      include ActionController::Live

      def events
        Rails.logger.info("Starting SSE connection...")
        response.headers['Content-Type'] = 'text/event-stream'
        response.headers['Last-Modified'] = Time.now.httpdate
        response.headers['Cache-Control'] = 'no-cache'
        response.headers['Connection'] = 'keep-alive'
        
        request_id = params[:request_id]
        status_key = "resume_status:#{request_id}"
        result_key = "resume_result:#{request_id}"
        Rails.logger.info("Monitoring status key: #{status_key}")
        
        sse = SSE.new(response.stream, retry: 300)
        
        begin
          # Send initial status if it exists
          if initial_status = $redis.get(status_key)
            Rails.logger.info("Found initial status: #{initial_status}")
            sse.write({ status: initial_status })
          end

          # Set a timeout of 60 seconds
          timeout = 60
          start_time = Time.now
          
          while Time.now - start_time < timeout
            current_status = $redis.get(status_key)
            
            if current_status && current_status != initial_status
              Rails.logger.info("Found status update: #{current_status}")
              
              # Check if this is a completion message
              if current_status.include?("completed")
                if result = $redis.get(result_key)
                  Rails.logger.info("Found result, sending completion message with result")
                  sse.write({ 
                    status: current_status,
                    result: JSON.parse(result)
                  })
                else
                  Rails.logger.error("No result found for completed status")
                  sse.write({ status: current_status })
                end
                break
              elsif current_status.include?("Error")
                Rails.logger.info("Sending error status")
                sse.write({ status: current_status })
                break
              else
                # Regular status update
                sse.write({ status: current_status })
              end
              
              initial_status = current_status
            end
            
            sleep 0.5
          end
        rescue IOError, ClientDisconnected => e
          Rails.logger.error("Client disconnected from SSE: #{e.message}")
        rescue StandardError => e
          Rails.logger.error("Error in SSE connection: #{e.message}")
          Rails.logger.error(e.backtrace.join("\n"))
        ensure
          Rails.logger.info("Cleaning up SSE connection...")
          sse.close
          # Only delete the status and result if we completed successfully
          if $redis.get(status_key)&.include?("completed")
            $redis.del(status_key)
            # Set expiry on result instead of deleting immediately
            $redis.expire(result_key, 3600) # Keep result for 1 hour after completion
          end
          response.stream.close
        end
      end
    end
  end
end 