class ResumeFormatterService
  ALLOWED_CONTENT_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ].freeze

  def initialize(file, request_id = nil)
    @file = file
    @request_id = request_id
    validate_file!
  end

  def format(mutex, condition)
    content = extract_text_from_file
    mutex.synchronize do
      condition.signal # Signal that the file has been read
    end
    gemini_service = GeminiApiService.new(@request_id)
    gemini_service.format_resume(content)
  rescue StandardError => e
    handle_error(e)
  end

  private

  def validate_file!
    raise 'No file provided' if @file.nil?
    raise 'Invalid file type' unless ALLOWED_CONTENT_TYPES.include?(@file.content_type)
    raise 'File too large' if @file.size > 10.megabytes
  end

  def extract_text_from_file
    case @file.content_type
    when 'text/plain'
      @file.read
    when 'application/pdf'
      extract_text_from_pdf
    when 'application/msword'
      extract_text_from_doc
    when 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      extract_text_from_docx
    else
      raise 'Unsupported file type'
    end
  end

  def extract_text_from_pdf
    begin
      reader = PDF::Reader.new(@file.path)
      text = ""
      reader.pages.each_with_index do |page, index|
        begin
          page_text = page.text.to_s
          text << page_text
          text << "\n" unless page_text.end_with?("\n")
        rescue StandardError => e
          Rails.logger.error("Error reading page #{index + 1}: #{e.message}")
        end
      end
      text = clean_text(text)
      raise 'No text content found in PDF' if text.strip.empty?
      text
    rescue PDF::Reader::MalformedPDFError, PDF::Reader::UnsupportedFeatureError => e
      Rails.logger.error("PDF parsing error: #{e.message}")
      raise 'Unable to read PDF file: The file appears to be corrupted or in an unsupported format'
    rescue StandardError => e
      Rails.logger.error("Error extracting text from PDF file: #{e.message}")
      raise 'Unable to read PDF file'
    end
  end

  def extract_text_from_doc
    # For older .doc files
    begin
      extractor = MSWordDoc::Extractor.load(@file.path)
      text = extractor.whole_contents
      clean_text(text)
    rescue StandardError => e
      Rails.logger.error("Error extracting text from DOC file: #{e.message}")
      raise 'Unable to read DOC file'
    end
  end

  def extract_text_from_docx
    # For newer .docx files
    begin
      doc = Docx::Document.open(@file.path)
      text = doc.paragraphs.map(&:text).join("\n")
      clean_text(text)
    rescue StandardError => e
      Rails.logger.error("Error extracting text from DOCX file: #{e.message}")
      raise 'Unable to read DOCX file'
    end
  end

  def clean_text(text)
    text.gsub(/[^\S\n]+/, ' ')  # Replace multiple spaces with single space
        .gsub(/\n{3,}/, "\n\n")  # Replace multiple newlines with double newline
        .strip
  end

  def handle_error(error)
    case error.message
    when 'No file provided', 'Invalid file type', 'File too large', 'Unsupported file type',
         'Unable to read DOC file', 'Unable to read DOCX file'
      raise error
    else
      # Rails.logger.error("Error processing resume: #{error.message}")
      raise error
      raise 'An error occurred while processing the resume'
    end
  end
end