
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import inspect
from backend.transactions import router as transactions_router
from backend.auth import router as auth_router
from backend.customer_requests import router as customer_requests_router
from backend.database import engine

app = FastAPI(
    title="SmartRecycle AI",
    description="Recycling Business Management System",
    version="2.0.0"
)

# Allow Frontend Connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register and Login API
app.include_router(auth_router)

# Customer Scrap Request API
app.include_router(customer_requests_router)
app.include_router(transactions_router)
# Serve uploaded Scrap photos from project uploads folder
BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "uploads"

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory=str(UPLOAD_DIR)),
    name="uploads"
)


@app.get("/")
def home():
    return {
        "app": "SmartRecycle AI",
        "version": "2.0.0",
        "status": "running",
        "message": "Welcome to SmartRecycle AI"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected"
    }


@app.get("/database-status")
def database_status():
    inspector = inspect(engine)
    tables = inspector.get_table_names()

    return {
        "database": "connected",
        "tables": tables
    }
