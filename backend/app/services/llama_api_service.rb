class LlamaApiService < ResumeApiService
  LLAMA_API_URL = 'https://api.fireworks.ai/inference/v1/chat/completions'
  
  def initialize(request_id = nil)
    super(request_id)
    @api_key = ENV['FIREWORKS_API_KEY']
    raise 'FIREWORKS_API_KEY not set in environment' if @api_key.nil?
  end

  private

  def make_api_request(prompt, pre_message = nil)
    messages = [{
      role: 'user',
      content: prompt
    }]

    request_body = {
      model: 'accounts/fireworks/models/llama-v3p3-70b-instruct',
      max_tokens: 3000,
      messages: messages,
      temperature: 0.2
    }
    
    response = RestClient.post(
      LLAMA_API_URL,
      request_body.to_json,
      {
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        'Authorization' => "Bearer #{@api_key}"
      }
    )
    
    parsed_response = JSON.parse(response.body)
    raise "Empty response from Llama API" if parsed_response['choices'].nil? || parsed_response['choices'].empty?

    choices = parsed_response['choices']
    first_choice = choices.is_a?(Array) ? choices[0] : choices
    message = first_choice.is_a?(Hash) ? first_choice['message'] : first_choice
    content = message.is_a?(Hash) ? message['content'] : message.to_s

    match = content.to_s.match(/```.*?\n(.*)\n```/m)
    match ? match[1].strip : content.to_s
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
    when 429 then raise 'Rate limit exceeded for Fireworks Llama API'
    else raise "Llama API error: #{error_message}"
    end
  end
end 