class AnthropicApiService < ResumeApiService
  ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
  
  def initialize(request_id = nil)
    super(request_id)
    @api_key = ENV['ANTHROPIC_API_KEY']
    raise 'ANTHROPIC_API_KEY not set in environment' if @api_key.nil?
  end

  private

  def make_api_request(prompt, pre_message = nil)
    messages = [{
      role: 'user',
      content: prompt
    }]

    if pre_message
      messages << {
        role: 'assistant',
        content: pre_message
      }
    end

    request_body = {
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2000,
      messages: messages
    }
    
    response = RestClient.post(
      ANTHROPIC_API_URL,
      request_body.to_json,
      {
        'Content-Type' => 'application/json',
        'x-api-key' => @api_key,
        'anthropic-version' => '2023-06-01'
      }
    )
    
    parsed_response = JSON.parse(response.body)
    raise "Empty response from Anthropic API" if parsed_response['content'].nil? || parsed_response['content'].empty?
    
    parsed_response.dig('content', 0, 'text')
  rescue RestClient::ExceptionWithResponse => e
    handle_api_error(e)
  end

  def handle_api_error(error)
    error_message = if error.response
      begin
        error_body = JSON.parse(error.response.body)
        error_body.dig('error', 'message') || 'Unknown API error'
      rescue JSON::ParserError
        error.response.body || error.message
      end
    else
      error.message
    end

    case error.response&.code
    when 401 then raise 'Invalid API key'
    when 429 then raise 'Rate limit exceeded'
    else raise "Anthropic API error: #{error_message}"
    end
  end
end