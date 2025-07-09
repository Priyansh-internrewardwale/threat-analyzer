# Threat Intelligence Dashboard

A full-stack cybersecurity dashboard that enables real-time threat analysis, interactive visualization, and automated threat categorization using machine learning

## Features

## Core Functionality

- Threat Explorer
- View, paginate, search, and filter threat reports by category or keyword
- Threat Detail View
- Inspect individual threats by ID
- RESTful API
- Statistics Dashboard
- Summary of threat distribution by category and severity

- Endpoints for `/api/threats`, `/api/threats/:id`, `/api/threats/stats`

## Advanced Features ( ML & DevOps)

- ML-Powered Threat Analysis
- Logistic Regression model predicts category for new descriptions via `/api/analyze`
- Full Dockerization
- One command to build & deploy: `docker-compose up --build`
- Backend Unit Testing
- Pytest tests for API endpoints and logic

## Technology Stack

- Frontend : React + TypeScript (TS) + Vite
- Styling : Tailwind CSS
- Backend : Flask (Python)
- ML : Scikit-learn + Joblib
- DB : SQLite (lightweight)
- DevOps : Docker + docker-compose
- Testing : Pytest

## Setup Instructions

Backend Setup (Flask + ML Model)
Navigate to backend:
cd backend
Create and activate a virtual environment:
python -m venv venv
venv\Scripts\activate # On Windows
or
source venv/bin/activate # On macOS/Linux

Install dependencies:
pip install -r requirements.txt
Train the ML model (TF-IDF + Logistic Regression):
python ml/train_model.py
Run the Flask server:
python app.py
The API will be live at:
http://localhost:5000

Frontend Setup (React + Vite)
Navigate to frontend:
cd frontend
Install packages:
npm install
Start development server:
npm run dev
The frontend will be available at:
http://localhost:5173

Docker Setup
Build and start everything:
docker-compose up --build
Access the app:
Frontend: http://localhost:5173
Backend API: http://localhost:5000/api/threats

## Testing

Run Tests (Backend API - Pytest)
Make sure the backend server is running (locally or via Docker).

From the project root or backend directory:
pytest test_api.py
Tests covered:
GET /api/threats – Pagination, filtering, and search
GET /api/threats/:id – Fetch threat by ID
GET /api/threats/stats – Summary stats
POST /api/analyze – ML-based prediction
