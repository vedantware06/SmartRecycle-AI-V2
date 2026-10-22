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
- SQLite

## 📁 Project Structure

```text
SmartRecycle-AI-V2/
├── backend/
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

### 1. Backend

Activate your Python virtual environment and install dependencies:

```bash
pip install -r requirements.txt
```

Initialize the database:

```bash
python -m backend.init_db
```

Start the API server:

```bash
python -m uvicorn backend.main:app --reload
```

Backend API documentation:

`http://127.0.0.1:8000/docs`

### 2. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local frontend URL shown in the terminal, usually:

`http://localhost:5173`

## 🔒 Security

- Local database files and private uploads should not be committed to Git.
- Keep passwords, API keys, and environment secrets out of the repository.

## 📌 Project Status

SmartRecycle AI V2 is under development. Features and deployment configuration may change as development continues.

## 👨‍💻 Developer

**Vedant Ajay Ware**

Academic Project — TY B.Sc. Data Science
