
from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column

from backend.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    language: Mapped[str] = mapped_column(String(2), default="en")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow
    )


class MarketPrice(Base):
    __tablename__ = "market_prices"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    material: Mapped[str] = mapped_column(String(100), index=True)
    rate_per_kg: Mapped[float] = mapped_column(Float)
    condition: Mapped[str] = mapped_column(String(30), default="Average")
    source: Mapped[str] = mapped_column(String(255), default="Manual entry")
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


class Stock(Base):
    __tablename__ = "stock"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    material: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    quantity_kg: Mapped[float] = mapped_column(Float, default=0.0)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    transaction_type: Mapped[str] = mapped_column(String(10), index=True)
    material: Mapped[str] = mapped_column(String(100), index=True)
    quantity_kg: Mapped[float] = mapped_column(Float)
    rate_per_kg: Mapped[float] = mapped_column(Float)
    market_rate_at_transaction: Mapped[float] = mapped_column(Float)
    total_amount: Mapped[float] = mapped_column(Float)
    condition: Mapped[str] = mapped_column(String(30))
    photo_path: Mapped[str | None] = mapped_column(String(500), nullable=True)
    party_name: Mapped[str | None] = mapped_column(String(150), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_by: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, index=True
    )

class CustomerScrapRequest(Base):
    __tablename__ = "customer_scrap_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    customer_name: Mapped[str] = mapped_column(String(150))
    mobile_number: Mapped[str] = mapped_column(String(20))

    material: Mapped[str] = mapped_column(String(100), index=True)
    estimated_quantity_kg: Mapped[float] = mapped_column(Float, default=0.0)

    condition: Mapped[str] = mapped_column(
        String(30), default="Pending inspection"
    )

    photo_path: Mapped[str | None] = mapped_column(
        String(500), nullable=True
    )

    pickup_method: Mapped[str] = mapped_column(String(20))
    pickup_address: Mapped[str | None] = mapped_column(
        Text, nullable=True
    )

    offered_rate_per_kg: Mapped[float | None] = mapped_column(
        Float, nullable=True
    )

    status: Mapped[str] = mapped_column(
        String(30), default="Pending", index=True
    )

    customer_notes: Mapped[str | None] = mapped_column(
        Text, nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, index=True
    )
