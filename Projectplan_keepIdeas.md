# Project Plan: Idea Keeper v1.0

This document outlines the vision, architecture, and step-by-step development plan for the "Idea Keeper" full-stack application.

## 1. Project Goal

To build a full-stack, containerized web application. The application will feature a Python/Flask backend API for managing data and a responsive HTML/CSS/JS frontend that uses the Bootstrap UI framework for a polished look and feel.

## 2. Technology Stack

-   **Backend:**
    -   Language/Framework: **Python 3** with **Flask**
    -   Database: **SQLite**
-   **Frontend:**
    -   Structure: **HTML5**
    -   Styling: **CSS3** and **Bootstrap 5**
    -   Logic: **JavaScript (ES6+)**
-   **Containerization & Orchestration:**
    -   **Docker:** To containerize the backend and frontend services.
    -   **Docker Compose:** To define and run the multi-container application.
-   **Version Control:**
    -   **Git:** For local version control.
    -   **GitHub:** For remote repository hosting and Pull Requests.

## 3. Architecture

The application will consist of two separate services managed by Docker Compose:

1.  **`backend` service:** A custom Docker image running the Python Flask API. It will handle all business logic and database interactions.
2.  **`frontend` service:** A standard Nginx Docker image configured to serve the static HTML, CSS, and JS files. It will also act as a reverse proxy, forwarding API requests (`/api/*`) to the backend service.

## 4. Professional Workflow (Git)

All development will follow a feature-branching workflow to keep the `main` branch stable.

1.  **Create a Branch:** For any new feature (e.g., `feature/backend-api`), create a new branch from `main`: `git checkout -b <branch-name>`.
2.  **Develop:** Write and test code on the feature branch.
3.  **Commit:** Make small, logical commits with clear messages (e.g., `feat: Implement GET /api/ideas endpoint`).
4.  **Push:** Push the feature branch to GitHub: `git push -u origin <branch-name>`.
5.  **Pull Request (PR):** Open a PR on GitHub to merge the feature branch into `main`.
6.  **Review & Merge:** Review the changes in the PR and then merge it.
7.  **Update Locally:** Switch back to the `main` branch and pull the latest changes: `git checkout main && git pull origin main`.

## 5. Development Phases

---

### Phase 0: Project Initialization

**Goal:** Prepare the local and remote environment for the project.

1.  **GitHub:** Create a new public repository on GitHub named `idea-keeper-app`. Initialize it with a `README.md` and a Python `.gitignore` file.
2.  **Clone:** Clone the repository to your local machine: `git clone <repo-url>`.
3.  **Directories:** Create the `backend` and `frontend` subdirectories.
4.  **`.dockerignore`:** Create a `.dockerignore` file in the project root to exclude unnecessary files from Docker builds.
5.  **Commit:** Commit and push the initial structure to `main`.

---

### Phase 1: Backend API Container

**Goal:** Create a working, containerized Flask API that can be tested independently.
**Git Branch:** `feature/backend-api`

1.  **Create Files:** In the `backend/` directory, create:
    -   `app.py`
    -   `requirements.txt`
    -   `Dockerfile`
2.  **Implement Logic:** Write the Flask application code in `app.py`, including SQLite database functions and the `GET /api/ideas` and `POST /api/ideas` endpoints.
3.  **Build & Test:**
    -   Build the image: `docker build -t idea-keeper-backend ./backend`
    -   Run the container: `docker run --rm -p 5001:5001 idea-keeper-backend`
    -   Test endpoints with `curl` or Postman.
4.  **PR & Merge:** Once complete and tested, commit the code, push the branch, and merge via a Pull Request on GitHub.

---

### Phase 2: Frontend with Bootstrap

**Goal:** Create a visually appealing, static frontend page.
**Git Branch:** `feature/frontend-ui`

1.  **Create Files:** In the `frontend/` directory, create:
    -   `index.html`
    -   `style.css`
    -   `script.js`
2.  **HTML Structure:** Build the basic page layout in `index.html`.
3.  **Integrate Bootstrap:** Add the Bootstrap 5 CDN links to `index.html`.
4.  **Build UI:** Use Bootstrap components (Cards, Forms, Buttons) to create the user interface.
5.  **PR & Merge:** Commit the static frontend files, push, and merge via PR.

---

### Phase 3: Orchestration with Docker Compose

**Goal:** Run both the frontend and backend services together with a single command.
**Git Branch:** `feature/docker-compose`

1.  **Create `docker-compose.yml`:** In the project root, create the Compose file.
2.  **Define Services:**
    -   Define the `backend` service, telling it to build from the `backend/` directory.
    -   Define the `frontend` service, using an `nginx` image and mounting the `frontend/` directory as its web root.
    -   Configure Nginx as a reverse proxy for `/api/` calls.
3.  **Test:** Run `docker-compose up --build`. Access the frontend in a browser and confirm it loads.
4.  **PR & Merge:** Commit the `docker-compose.yml` file, push, and merge via PR.

---

### Phase 4: Connecting the Stack

**Goal:** Make the frontend dynamic by communicating with the backend API.
**Git Branch:** `feature/frontend-logic`

1.  **Fetch & Display:** In `script.js`, write a function to `fetch` data from `/api/ideas` on page load and dynamically render the ideas on the page.
2.  **Submit Ideas:** Add an event listener to the form. On submit, prevent the default action, get the form data, and send it to `/api/ideas` via a `POST` request.
3.  **Update UI:** After a successful POST, refresh the list of ideas to show the new entry.
4.  **PR & Merge:** Commit the final JavaScript logic, push, and merge via PR.