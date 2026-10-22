# ♻️ SmartRecycle AI V2

**Smart Recycling Business Management System**

SmartRecycle AI V2 is a web-based project designed to help manage recycling and scrap business operations digitally.

## Features

- User Registration and Login
- Business Dashboard
- Purchase and Sale Management
- Market Price Management
- Stock Management
- Transaction History
- Customer Scrap Requests
- Photo Support
- English and Marathi Language Support

## Technologies Used

**Frontend:** React, Vite, JavaScript, CSS

**Backend:** Python, FastAPI, SQLAlchemy

**Database:** SQLite

## Run Locally

### Backend

```bash
pip install -r requirements.txt
python -m backend.init_db
python -m uvicorn backend.main:app --reload
```

API documentation: `http://127.0.0.1:8000/docs`

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Project Status

This project is under development. Deployment and features may change.

## Developer

Vedant Ajay Ware

TY B.Sc. Data Science Academic Project
