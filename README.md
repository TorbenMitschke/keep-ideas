# Idea Keeper

A lightweight web application for storing and managing your ideas. Built with Python/Flask backend and a responsive Bootstrap frontend.

## Features

- Store and manage your ideas
- Responsive web interface
- RESTful API
- Containerized deployment

## Tech Stack

- **Backend:**
  - Python 3 with Flask
  - SQLite database
- **Frontend:**
  - HTML5
  - CSS3 with Bootstrap 5
  - JavaScript (ES6+)
- **Containerization:**
  - Docker
  - Docker Compose

## Prerequisites

- Docker Desktop
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd idea-keeper
   ```

2. Start the application:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:5001

## Development

The project follows a feature-branching workflow:

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
4. Get code review
5. Merge to main

## Project Structure

```
idea-keeper/
├── backend/           # Flask API
├── frontend/         # Static web files
├── docker-compose.yml
├── .dockerignore
└── .gitignore
```

## License

MIT 