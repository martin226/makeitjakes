# Make It Jake's

A modern web application for converting any resume into Jake's Resume template—the industry standard for SWEs, built with Ruby on Rails backend and Remix.js frontend.

## 🚀 Features

- Resume file upload and processing
- LaTeX output generation
- Modern, responsive UI
- RESTful API architecture
- Containerized deployment with Docker

## 🛠️ Tech Stack

### Backend
- Ruby on Rails API
- Redis for job processing
- Docker containerization

### Frontend
- Remix.js
- TypeScript
- Tailwind CSS
- Vite

### Infrastructure
- Google Cloud Platform
- Load Balancer configuration
- CI/CD with Cloud Build

## 🏗️ Project Structure

```
.
├── backend/           # Ruby on Rails API server
├── frontend/          # Remix.js web application
├── cloudbuild.yaml    # Cloud Build configuration
└── lb.yaml           # Load balancer configuration
```

## 🚦 Prerequisites

- Node.js (v18 or higher)
- Ruby (3.x)
- Docker and Docker Compose
- Redis

## 🔧 Setup & Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Start the Rails server:
   ```bash
   rails server
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🐳 Docker Deployment

Both frontend and backend components can be run using Docker:

1. Build the images:
   ```bash
   docker-compose build
   ```

2. Start the services:
   ```bash
   docker-compose up
   ```

## 🚀 Cloud Deployment

The application is configured for deployment on Google Cloud Platform:

1. Configure your GCP project and authenticate:
   ```bash
   gcloud auth login
   gcloud config set project [YOUR_PROJECT_ID]
   ```

2. Deploy using Cloud Build:
   ```bash
   gcloud builds submit
   ```

## 🔒 Environment Variables

Make sure to set up the following environment variables:

### Backend (.env)
- `ANTHROPIC_API_KEY` - Anthropic API key for resume processing
- `REDIS_URL` - Redis connection URL
- `RAILS_ENV` - Rails environment (development/production)
- `RAILS_LOG_TO_STDOUT` - Enable logging to stdout in production
- `RAILS_SERVE_STATIC_FILES` - Enable serving static files in production
- `RAILS_MASTER_KEY` - Rails master key for decrypting credentials
- `SECRET_KEY_BASE` - Rails secret key for production

### Frontend (.env)
No environment variables required for local development. Production variables are handled through Cloud Run deployment.

Note: In production (Cloud Run), secrets are managed through GCP Secret Manager.

## 📝 API Documentation

The backend provides RESTful API endpoints for resume processing:

- `POST /api/v1/resumes` - Upload a resume file for processing
  - Accepts multipart form data with a `file` parameter
  - Returns a `request_id` for tracking the processing status
  - Rate limited to 5 requests per 15 minutes per IP

- `GET /api/v1/resumes/preview?request_id=<request_id>` - Preview the processed resume
  - Returns PDF file for inline display
  - Caches the PDF for 1 hour after generation

- `GET /api/v1/status/events?request_id=<request_id>` - Server-Sent Events (SSE) endpoint for real-time status updates
  - Streams processing status updates
  - Returns final result when processing is complete
  - Connection times out after 60 seconds
  - Results are cached for 1 hour after completion

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 