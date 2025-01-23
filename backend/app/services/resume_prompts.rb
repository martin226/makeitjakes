module ResumePrompts
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
  LATEX

  def self.extraction_prompt(resume_content)
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

      If the provided content is not a resume, return {error: "Not a resume"}.

      Resume Content:
      #{resume_content}
    PROMPT
  end

  def self.latex_prompt(extracted_info)
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
      IMPORTANT: Do not include any additional text or comments in the LaTeX output. Do not include any ```latex or ``` in the LaTeX output.
    PROMPT
  end
end 