# ♻️ SmartRecycle AI V2

### Smart Recycling Business Management System

SmartRecycle AI V2 is a web-based application designed to help manage a recycling and scrap business digitally. It aims to simplify purchase and sale transactions, track stock, view market prices, and manage customer scrap requests.

## 🚀 Features

- 🔐 User Registration and Login
- 📊 Business Dashboard
- 🛒 Purchase and Sale Management
- 💹 Market Price Management
- 📦 Stock Management
- 🧾 Transaction History
- 📸 Customer Scrap Requests and Photo Support
- 🌐 English and Marathi Language Support

## 🛠️ Technologies Used

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Python
- FastAPI
- SQLAlchemy

**Database**
- SQLite

## 📁 Project Structure

```text
SmartRecycle-AI-V2/
├── backend/
│   ├── __init__.py
│   ├── auth.py
│   ├── customer_requests.py
│   ├── database.py
│   ├── init_db.py
│   ├── main.py
│   ├── models.py
│   └── transactions.py
├── frontend/
│   ├── public/
│   └── src/
├── render.yaml
├── requirements.txt
└── README.md
```

## 💻 Run Locally

### 1. Backend Setup

Open a terminal in the project root folder and activate your Python virtual environment.

Install the dependencies:

```bash
pip install -r requirements.txt
```

Initialize the database:

```bash
python -m backend.init_db
```

Start the backend server:

```bash
python -m uvicorn backend.main:app --reload
```

Backend API documentation:

http://127.0.0.1:8000/docs

### 2. Frontend Setup

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend URL shown in the terminal, usually:

http://localhost:5173

## 🔒 Security

- Do not upload local database files or private customer photos to GitHub.
- Never commit passwords, API keys, or secret environment variables.
- Configure the correct frontend URL and database settings before deployment.

## 📌 Project Status

SmartRecycle AI V2 is under development. Features and deployment configuration may change as development continues.

## 👨‍💻 Developer

**Vedant Ajay Ware**

TY B.Sc. Data Science Academic Project
