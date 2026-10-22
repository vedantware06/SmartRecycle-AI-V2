
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from backend.database import get_db
from backend.models import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

password_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


class RegisterRequest(BaseModel):
    username: str = Field(min_length=3, max_length=100)
    password: str = Field(min_length=8, max_length=72)


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    username = data.username.strip()

    if len(username) < 3:
        raise HTTPException(
            status_code=400,
            detail="Username must contain at least 3 characters"
        )

    existing_user = db.query(User).filter(
        User.username == username
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Username already exists"
        )

    user = User(
        username=username,
        password_hash=password_context.hash(data.password),
        created_at=datetime.utcnow()
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "Registration successful",
        "user_id": user.id,
        "username": user.username
    }


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.username == data.username.strip()
    ).first()

    if (
        not user
        or not user.is_active
        or not password_context.verify(
            data.password, user.password_hash
        )
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    return {
        "message": "Login successful",
        "user_id": user.id,
        "username": user.username,
        "language": user.language
    }
