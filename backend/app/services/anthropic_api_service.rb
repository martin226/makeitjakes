class AnthropicApiService
  ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'
  
  # Jake's original LaTeX template code
  JAKES_TEMPLATE = <<~'LATEX'
    \documentclass[letterpaper,11pt]{article}

    \usepackage{latexsym}
    \usepackage[empty]{fullpage}
    \usepackage{titlesec}
    \usepackage{marvosym}
    \usepackage[usenames,dvipsnames]{color}
    \usepackage{verbatim}
    \usepackage{enumitem}
    \usepackage[hidelinks]{hyperref}
    \usepackage{fancyhdr}
    \usepackage[english]{babel}
    \usepackage{tabularx}
    \usepackage{fontawesome5}
    \usepackage{multicol}
    \setlength{\multicolsep}{-3.0pt}
    \setlength{\columnsep}{-1pt}
    \input{glyphtounicode}
    
    
    %----------FONT OPTIONS----------
    % sans-serif
    % \usepackage[sfdefault]{FiraSans}
    % \usepackage[sfdefault]{roboto}
    % \usepackage[sfdefault]{noto-sans}
    % \usepackage[default]{sourcesanspro}
    
    % serif
    % \usepackage{CormorantGaramond}
    % \usepackage{charter}
    
    
    \pagestyle{fancy}
    \fancyhf{} % clear all header and footer fields
    \fancyfoot{}
    \renewcommand{\headrulewidth}{0pt}
    \renewcommand{\footrulewidth}{0pt}
    
    % Adjust margins
    \addtolength{\oddsidemargin}{-0.6in}
    \addtolength{\evensidemargin}{-0.5in}
    \addtolength{\textwidth}{1.19in}
    \addtolength{\topmargin}{-.7in}
    \addtolength{\textheight}{1.4in}
    
    \urlstyle{same}
    
    \raggedbottom
    \raggedright
    \setlength{\tabcolsep}{0in}
    
    % Sections formatting
    \titleformat{\section}{
      \vspace{-4pt}\scshape\raggedright\large\bfseries
    }{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]
    
    % Ensure that generate pdf is machine readable/ATS parsable
    \pdfgentounicode=1
    
    %-------------------------
    % Custom commands
    \newcommand{\resumeItem}[1]{
      \item\small{
        {#1 \vspace{-2pt}}
      }
    }
    
    \newcommand{\classesList}[4]{
        \item\small{
            {#1 #2 #3 #4 \vspace{-2pt}}
      }
    }
    
    \newcommand{\resumeSubheading}[4]{
      \vspace{-2pt}\item
        \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
          \textbf{#1} & \textbf{\small #2} \\
          \textit{\small#3} & \textit{\small #4} \\
        \end{tabular*}\vspace{-7pt}
    }
    
    \newcommand{\resumeSubSubheading}[2]{
        \item
        \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
          \textit{\small#1} & \textit{\small #2} \\
        \end{tabular*}\vspace{-7pt}
    }
    
    \newcommand{\resumeProjectHeading}[2]{
        \item
        \begin{tabular*}{1.001\textwidth}{l@{\extracolsep{\fill}}r}
          \small#1 & \textbf{\small #2}\\
        \end{tabular*}\vspace{-7pt}
    }
    
    \newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}
    
    \renewcommand\labelitemi{$\vcenter{\hbox{\tiny$\bullet$}}$}
    \renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
    
    \newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
    \newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
    \newcommand{\resumeItemListStart}{\begin{itemize}}
    \newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}
    
    %-------------------------------------------
    %%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    
    \begin{document}
    
    %----------HEADING----------
    % \begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}
    %   \textbf{\href{http://sourabhbajaj.com/}{\Large Sourabh Bajaj}} & Email : \href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\
    %   \href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\
    % \end{tabular*}
    
    \begin{center}
        {\Huge \scshape First Last} \\ \vspace{1pt}
        123 Street Name, Town, State 12345 \\ \vspace{1pt}
        \small \raisebox{-0.1\height}\faPhone\ 123-456-7890 ~ \href{mailto:x@gmail.com}{\raisebox{-0.2\height}\faEnvelope\  \underline{email@gmail.com}} ~ 
        \href{https://linkedin.com/in//}{\raisebox{-0.2\height}\faLinkedin\ \underline{linkedin.com/in/username}}  ~
        \href{https://github.com/}{\raisebox{-0.2\height}\faGithub\ \underline{github.com/username}}
        \vspace{-8pt}
    \end{center}
    
    
    %-----------EDUCATION-----------
    \section{Education}
      \resumeSubHeadingListStart
        \resumeSubheading
          {State University}{Sep. 2017 -- May 2021}
          {Bachelor of Science in Computer Science}{City, State}
      \resumeSubHeadingListEnd
    
    %------RELEVANT COURSEWORK-------
    \section{Relevant Coursework}
        %\resumeSubHeadingListStart
            \begin{multicols}{4}
                \begin{itemize}[itemsep=-5pt, parsep=3pt]
                    \item\small Data Structures
                    \item Software Methodology
                    \item Algorithms Analysis
                    \item Database Management
                    \item Artificial Intelligence
                    \item Internet Technology
                    \item Systems Programming
                    \item Computer Architecture
                \end{itemize}
            \end{multicols}
            \vspace*{2.0\multicolsep}
        %\resumeSubHeadingListEnd
    
    
    %-----------EXPERIENCE-----------
    \section{Experience}
      \resumeSubHeadingListStart
    
        \resumeSubheading
          {Electronics Company}{May 2020 -- August 2020}
          {Software Engineer Intern}{City, State}
          \resumeItemListStart
            \resumeItem{Developed a service to automatically perform a set of unit tests daily on a product in development in order to decrease time needed for team members to identify and fix bugs/issues.}
            \resumeItem{Incorporated scripts using Python and PowerShell to aggregate XML test results into an organized format and to load the latest build code onto the hardware, so that daily testing can be performed.}
            \resumeItem{Utilized Jenkins to provide a continuous integration service in order to automate the entire process of loading the latest build code and test files, running the tests, and generating a report of the results once per day.}
            \resumeItem{Explored ways to visualize and send a daily report of test results to team members  using HTML, Javascript, and CSS.}
          \resumeItemListEnd
    
        \resumeSubheading
          {Startup, Inc}{May 2019 -- August 2019}
          {Front End Developer Intern}{City, State}
          \resumeItemListStart
            \resumeItem{Assisted in development of the front end of a mobile application for iOS/Android using Dart and the Flutter framework.}
            \resumeItem{Worked with Google Firebase to manage user inputted data across multiple platforms including web and mobile apps.}
            \resumeItem{Collaborated with team members using version control systems such as Git to organize modifications and assign tasks.}
            \resumeItem{Utilized Android Studio as a development environment in order to visualize the application in both iOS and Android.}
        \resumeItemListEnd
        
      \resumeSubHeadingListEnd
    \vspace{-16pt}
    
    %-----------PROJECTS-----------
    \section{Projects}
        \vspace{-5pt}
        \resumeSubHeadingListStart
          \resumeProjectHeading
              {\textbf{Gym Reservation Bot} $|$ \emph{Python, Selenium, Google Cloud Console}}{January 2021}
              \resumeItemListStart
                \resumeItem{Developed an automatic bot using Python and Google Cloud Console to register myself for a timeslot at my school gym.}
                \resumeItem{Implemented Selenium to create an instance of Chrome in order to interact with the correct elements of the web page.}
                \resumeItem{Created a Linux virtual machine to run on Google Cloud so that the program is able to run everyday from the cloud.}
                \resumeItem{Used Cron to schedule the program to execute automatically at 11 AM every morning so a reservation is made for me.}
              \resumeItemListEnd
              \vspace{-13pt}
          \resumeProjectHeading
              {\textbf{Ticket Price Calculator App} $|$ \emph{Java, Android Studio}}{November 2020}
              \resumeItemListStart
                \resumeItem{Created an Android application using Java and Android Studio to calculate ticket prices for trips to museums in NYC.}
                \resumeItem{Processed user inputted information in the back-end of the app to return a subtotal price based on the tickets selected.}
                \resumeItem{Utilized the layout editor to create a UI for the application in order to allow different scenes to interact with each other.}
              \resumeItemListEnd 
              \vspace{-13pt}
              \resumeProjectHeading
              {\textbf{Transaction Management GUI} $|$ \emph{Java, Eclipse, JavaFX}}{October 2020}
              \resumeItemListStart
                \resumeItem{Designed a sample banking transaction system using Java to simulate the common functions of using a bank account.}
                \resumeItem{Used JavaFX to create a GUI that supports actions such as creating an account, deposit, withdraw, list all acounts, etc.}
                \resumeItem{Implemented object-oriented programming practices such as inheritance to create different account types and databases.}
              \resumeItemListEnd 
        \resumeSubHeadingListEnd
    \vspace{-15pt}
    
    
    %
    %-----------PROGRAMMING SKILLS-----------
    \section{Technical Skills}
     \begin{itemize}[leftmargin=0.15in, label={}]
        \small{\item{
         \textbf{Languages}{: Python, Java, C, HTML/CSS, JavaScript, SQL} \\
         \textbf{Developer Tools}{: VS Code, Eclipse, Google Cloud Platform, Android Studio} \\
         \textbf{Technologies/Frameworks}{: Linux, Jenkins, GitHub, JUnit, WordPress} \\
        }}
     \end{itemize}
     \vspace{-16pt}
    
    
    %-----------INVOLVEMENT---------------
    \section{Leadership / Extracurricular}
        \resumeSubHeadingListStart
            \resumeSubheading{Fraternity}{Spring 2020 -- Present}{President}{University Name}
                \resumeItemListStart
                    \resumeItem{Achieved a 4 star fraternity ranking by the Office of Fraternity and Sorority Affairs (highest possible ranking).}
                    \resumeItem{Managed executive board of 5 members and ran weekly meetings to oversee progress in essential parts of the chapter.}
                    \resumeItem{Led chapter of 30+ members to work towards goals that improve and promote community service, academics, and unity.}
                \resumeItemListEnd
            
        \resumeSubHeadingListEnd
    
    
    \end{document}
  LATEX

  def initialize
    @api_key = ENV['ANTHROPIC_API_KEY']
    raise 'ANTHROPIC_API_KEY not set in environment' if @api_key.nil?
  end

  def format_resume(resume_content)
    update_status("Starting resume formatting process...")
    Rails.logger.info("Starting resume formatting process...")
    Rails.logger.info("Resume content length: #{resume_content.length} characters")
    
    # Step 1: Extract structured information from the resume
    update_status("Extracting structured information from resume...")
    Rails.logger.info("Step 1: Extracting structured information...")
    extracted_info = extract_resume_details(resume_content)
    Rails.logger.info("Extracted JSON structure:")
    Rails.logger.info(JSON.pretty_generate(extracted_info))
    
    # Step 2: Format the structured information into Jake's LaTeX template
    update_status("Generating LaTeX from structured information...")
    Rails.logger.info("Step 2: Generating LaTeX from structured information...")
    latex = generate_latex(extracted_info)
    Rails.logger.info("Generated LaTeX:")
    Rails.logger.info(latex)
    
    update_status("Resume formatting completed successfully!")
    Rails.logger.info("Resume formatting completed successfully")
    latex
  rescue RestClient::ExceptionWithResponse => e
    Rails.logger.error("API Error encountered:")
    Rails.logger.error(e.response)
    update_status("Error: API request failed")
    handle_api_error(e)
  rescue StandardError => e
    Rails.logger.error("Anthropic API error: #{e.message}")
    Rails.logger.error(e.backtrace.join("\n"))
    update_status("Error: #{e.message}")
    raise "Failed to process resume: #{e.message}"
  end

  private

  def extract_resume_details(resume_content)
    Rails.logger.info("Making API request for resume extraction...")
    Rails.logger.info("Extraction prompt:")
    Rails.logger.info(extraction_prompt(resume_content))
    
    response = make_api_request(extraction_prompt(resume_content))
    Rails.logger.info("Raw extraction response:")
    Rails.logger.info(response)
    
    parsed_json = JSON.parse(response)
    Rails.logger.info("Successfully parsed JSON response")
    parsed_json
  rescue JSON::ParserError => e
    Rails.logger.error("JSON parsing error: #{e.message}")
    Rails.logger.error("Failed response content:")
    Rails.logger.error(response)
    raise "Failed to extract resume details"
  end

  def generate_latex(extracted_info)
    Rails.logger.info("Making API request for LaTeX generation...")
    Rails.logger.info("LaTeX prompt:")
    Rails.logger.info(latex_prompt(extracted_info))
    
    pre_message = "I'll help you convert the resume information into LaTeX format using Jake's template. Here's the complete LaTeX code:"
    latex = make_api_request(latex_prompt(extracted_info), pre_message)
    Rails.logger.info("Successfully generated LaTeX")
    latex
  end

  def make_api_request(prompt, pre_message = nil)
    Rails.logger.info("Making request to Anthropic API...")
    messages = [{
      role: 'user',
      content: prompt
    }]

    # Add pre-filled assistant message if provided
    if pre_message
      messages << {
        role: 'assistant',
        content: pre_message
      }
    end

    request_body = {
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 4000,
      messages: messages
    }
    Rails.logger.info("Request body:")
    Rails.logger.info(JSON.pretty_generate(request_body))
    
    response = RestClient.post(
      ANTHROPIC_API_URL,
      request_body.to_json,
      {
        'Content-Type' => 'application/json',
        'x-api-key' => @api_key,
        'anthropic-version' => '2023-06-01'
      }
    )
    Rails.logger.info("Received response from Anthropic API")
    Rails.logger.info("Response status: #{response.code}")
    
    parsed_response = JSON.parse(response.body)
    if parsed_response['content'].nil? || parsed_response['content'].empty?
      Rails.logger.error("Empty content in API response:")
      Rails.logger.error(JSON.pretty_generate(parsed_response))
      raise "Empty response from Anthropic API"
    end
    
    Rails.logger.info("Successfully extracted content from response")
    parsed_response.dig('content', 0, 'text')
  end

  def extraction_prompt(resume_content)
    <<~PROMPT
      You are a professional resume parser. Extract all relevant information from the following resume into a structured JSON format.
      Include the following fields if present:
      - name (first and last name separately)
      - contact (email, phone, location with street, city, state, zip)
      - education (degree, school, graduation date, GPA, relevant coursework)
      - experience (company, title, dates, location, bullet points of achievements)
      - projects (name, technologies used, bullet points of details)
      - technical_skills (categorized by: languages, developer_tools, technologies_frameworks)
      - leadership (organization, role, dates, location, bullet points of achievements)
      
      Format the response as valid JSON that can be parsed. Ensure all dates, locations, and other details are preserved exactly as written.
      If certain information is not present in the resume, omit those fields from the JSON rather than including empty values.
      
      For bullet points, preserve the exact wording but clean up any formatting issues.
      For technical skills, split them into the exact categories shown above.

      Resume Content:
      #{resume_content}
    PROMPT
  end

  def latex_prompt(extracted_info)
    <<~PROMPT
      You are a LaTeX expert. Convert the following structured resume information into Jake's Resume LaTeX format.
      Follow these specific formatting requirements and use the template code below as your base:

      Here is Jake's original LaTeX template code for reference:
      #{JAKES_TEMPLATE}

      Follow the template exactly, maintaining all the packages, custom commands, and formatting.
      Replace only the content while keeping all the styling and structure identical.

      Key sections to update:
      1. Header - Replace with the provided name and contact information
      2. Education - Use the same formatting but with the provided education details
      3. Coursework - Keep the 4-column layout using multicols
      4. Experience - Use \\resumeSubheading and \\resumeItem for each position
      5. Projects - Use \\resumeProjectHeading with the $|$ separator for technologies
      6. Technical Skills - Keep the exact same categories and formatting
      7. Leadership - Use the same formatting as the Experience section

      Here's the resume information to format:
      #{extracted_info}

      Return only the complete LaTeX code, starting with \\documentclass and ending with \\end{document}.
      Ensure all LaTeX commands are properly escaped and the document is compilable.
    PROMPT
  end

  def handle_api_error(error)
    Rails.logger.error("Handling API error...")
    error_message = if error.response
      begin
        error_body = JSON.parse(error.response.body)
        Rails.logger.error("Error response body:")
        Rails.logger.error(JSON.pretty_generate(error_body))
        error_body.dig('error', 'message') || 'Unknown API error'
      rescue JSON::ParserError
        Rails.logger.error("Failed to parse error response:")
        Rails.logger.error(error.response.body)
        error.response.body || error.message
      end
    else
      Rails.logger.error("No response in error:")
      Rails.logger.error(error.message)
      error.message
    end

    case error.response&.code
    when 401
      Rails.logger.error("Authentication error (401)")
      raise 'Invalid API key'
    when 429
      Rails.logger.error("Rate limit error (429)")
      raise 'Rate limit exceeded'
    else
      Rails.logger.error("Other API error (#{error.response&.code})")
      raise "Anthropic API error: #{error_message}"
    end
  end

  def update_status(message)
    $redis.set('resume_status', message)
  end
end