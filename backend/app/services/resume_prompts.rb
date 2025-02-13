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
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
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

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
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
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\begin{document}

%----------HEADING----------
\begin{center}
    \textbf{\Huge \scshape Jake Ryan} \\ \vspace{1pt}
    \small 123-456-7890 $|$ \href{mailto:x@x.com}{\underline{jake@su.edu}} $|$ 
    \href{https://linkedin.com/in/...}{\underline{linkedin.com/in/jake}} $|$
    \href{https://github.com/...}{\underline{github.com/jake}}
\end{center}


%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
    \resumeSubheading
      {Southwestern University}{Georgetown, TX}
      {Bachelor of Arts in Computer Science, Minor in Business}{Aug. 2018 -- May 2021}
    \resumeSubheading
      {Blinn College}{Bryan, TX}
      {Associate's in Liberal Arts}{Aug. 2014 -- May 2018}
  \resumeSubHeadingListEnd


%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart

    \resumeSubheading
      {Undergraduate Research Assistant}{June 2020 -- Present}
      {Texas A\&M University}{College Station, TX}
      \resumeItemListStart
        \resumeItem{Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems}
        \resumeItem{Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data}
        \resumeItem{Explored ways to visualize GitHub collaboration in a classroom setting}
      \resumeItemListEnd
      
% -----------Multiple Positions Heading-----------
% Example of how to add multiple positions to a job:
%    \resumeSubSubheading
%     {Software Engineer I}{Oct 2014 - Sep 2016}
%     \resumeItemListStart
%        \resumeItem{Apache Beam}
%          {Apache Beam is a unified model for defining both batch and streaming data-parallel processing pipelines}
%     \resumeItemListEnd
%    \resumeSubHeadingListEnd
%-------------------------------------------

    \resumeSubheading
      {Information Technology Support Specialist}{Sep. 2018 -- Present}
      {Southwestern University}{Georgetown, TX}
      \resumeItemListStart
        \resumeItem{Communicate with managers to set up campus computers used on campus}
        \resumeItem{Assess and troubleshoot computer problems brought by students, faculty and staff}
        \resumeItem{Maintain upkeep of computers, classroom equipment, and 200 printers across campus}
    \resumeItemListEnd

    \resumeSubheading
      {Artificial Intelligence Research Assistant}{May 2019 -- July 2019}
      {Southwestern University}{Georgetown, TX}
      \resumeItemListStart
        \resumeItem{Explored methods to generate video game dungeons based off of \emph{The Legend of Zelda}}
        \resumeItem{Developed a game in Java to test the generated dungeons}
        \resumeItem{Contributed 50K+ lines of code to an established codebase via Git}
        \resumeItem{Conducted  a human subject study to determine which video game dungeon generation technique is enjoyable}
        \resumeItem{Wrote an 8-page paper and gave multiple presentations on-campus}
        \resumeItem{Presented virtually to the World Conference on Computational Intelligence}
      \resumeItemListEnd

  \resumeSubHeadingListEnd


%-----------PROJECTS-----------
\section{Projects}
    \resumeSubHeadingListStart
      \resumeProjectHeading
          {\textbf{Gitlytics} $|$ \emph{Python, Flask, React, PostgreSQL, Docker}}{June 2020 -- Present}
          \resumeItemListStart
            \resumeItem{Developed a full-stack web application using with Flask serving a REST API with React as the frontend}
            \resumeItem{Implemented GitHub OAuth to get data from user’s repositories}
            \resumeItem{Visualized GitHub data to show collaboration}
            \resumeItem{Used Celery and Redis for asynchronous tasks}
          \resumeItemListEnd
      \resumeProjectHeading
          {\textbf{Simple Paintball} $|$ \emph{Spigot API, Java, Maven, TravisCI, Git}}{May 2018 -- May 2020}
          \resumeItemListStart
            \resumeItem{Developed a Minecraft server plugin to entertain kids during free time for a previous job}
            \resumeItem{Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review}
            \resumeItem{Implemented continuous delivery using TravisCI to build the plugin upon new a release}
            \resumeItem{Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin}
          \resumeItemListEnd
    \resumeSubHeadingListEnd

%-----------PROGRAMMING SKILLS-----------
\section{Technical Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
     \textbf{Languages}{: Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R} \\
     \textbf{Frameworks}{: React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI} \\
     \textbf{Developer Tools}{: Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse} \\
     \textbf{Libraries}{: pandas, NumPy, Matplotlib}
    }}
 \end{itemize}

\end{document}
  LATEX

  def self.extraction_prompt(resume_content)
    <<~PROMPT
      You are a professional resume parser. Extract all relevant information from the following resume into a structured JSON format.
      Include the following fields if present:
      - name (first and last name separately)
      - contact (email, phone, location with street, city, state, zip)
      - social_media (linkedin, github, twitter, etc.)
      - education (degree, school, graduation date, GPA, relevant coursework)
      - experience (company, title, dates, location, bullet points of achievements)
      - projects (name, technologies used, bullet points of details)
      - technical_skills (categorized by: languages, developer_tools, technologies_frameworks)
      - leadership (organization, role, dates, location, bullet points of achievements)
      - awards (name, date, organization, description)
      - certifications (name, date, organization, description)
      - publications (title, date, organization, description)
      - honors (name, date, organization, description)
      - presentations (name, date, organization, description)
      - other (any other information that is not covered by the above fields)
      
      Format the response as valid JSON that can be parsed. Ensure all dates, locations, and other details are preserved exactly as written.
      If certain information is not present in the resume, omit those fields from the JSON rather than including empty values.
      
      For bullet points, preserve the exact wording but clean up any formatting issues.
      For technical skills, split them into the exact categories shown above.

      If the provided content is not a resume, return {error: "Not a resume"}.

      Resume Content:
      #{resume_content}

      IMPORTANT: Do not include any additional text or comments in the JSON output. Do not include any ```json or ``` in the output.
      IMPORTANT: Provide ONLY the JSON output, no other text or comments.

      {
    PROMPT
  end

  def self.latex_prompt(extracted_info)
    <<~PROMPT
      You are a LaTeX expert. Convert the following structured resume information into Jake's Resume LaTeX format.
      Follow these specific formatting requirements and use the template code below as your base:

      Here is an example resume formatted in Jake's LaTeX template:
      #{JAKES_TEMPLATE}

      Follow the template, maintaining all the packages, custom commands, and formatting.
      Replace only the content while keeping most of the styling and structure identical.
      You may change certain styling to fit the content, but do not change the structure of the document.
      You do not need to use all the sections, but you should use the same structure and formatting as the example.
      For empty content, omit the section entirely. For example, if a job has no bullet points, omit the \\resumeItemListStart and \\resumeItemListEnd.
      Ensure all content is grammatically correct and properly formatted.


      Key sections to update:
      1. Header - Replace with the provided name and contact information
      2. Education - Use the same formatting but with the provided education details
      3. Experience - Use \\resumeSubheading and \\resumeItem for each position
      4. Projects - Use \\resumeProjectHeading with the $|$ separator for technologies
      5. Technical Skills - Keep the exact same categories and formatting
      6. Awards, Certifications, Publications, Honors, Presentations - Use the same formatting as the Technical Skills section
      7. Leadership, Other - Use the same formatting as the Experience section

      Here's the resume information to format:
      #{extracted_info}

      Return only the complete LaTeX code, starting with \\documentclass and ending with \\end{document}.
      Ensure all LaTeX commands are properly escaped and the document is compilable.

      IMPORTANT: Omit non-Unicode characters from the LaTeX output.
      IMPORTANT: Escape all characters that are not allowed in LaTeX. These include: \ { } $ % ^ ~ _ # & |. You can escape them by adding a backslash before the character.
      IMPORTANT: If certain information is not present in the resume, omit those fields from the LaTeX output. For example, if a project has no technologies used, omit the technologies used section. If a project has no dates, omit the dates section. Do NOT write "None" or "N/A" in the LaTeX output.
      IMPORTANT: Do not include any additional text or comments in the LaTeX output. Do not include any ```latex or ``` in the LaTeX output.
      IMPORTANT: Do not add unnecessary or additional formatting beyond what is already in the template.
      IMPORTANT: Provide ONLY the LaTeX output, no other text or comments.
      \\documentclass
    PROMPT
  end
end 