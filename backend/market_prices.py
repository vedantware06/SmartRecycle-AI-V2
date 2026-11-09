
from datetime import datetime

from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models import MarketPrice

router = APIRouter(prefix="/market-prices", tags=["Market Prices"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Get all market prices
@router.get("/")
def get_market_prices(db: Session = Depends(get_db)):
    return (
        db.query(MarketPrice)
        .order_by(MarketPrice.updated_at.desc())
        .all()
    )


# Add a new market price
@router.post("/")
def add_market_price(
    material: str = Form(...),
    rate_per_kg: float = Form(...),
    condition: str = Form("Average"),
    source: str = Form("Manual entry"),
    db: Session = Depends(get_db),
):
    material = material.strip()

    if not material:
        raise HTTPException(status_code=400, detail="Material is required")

    if rate_per_kg <= 0:
        raise HTTPException(status_code=400, detail="Rate must be greater than zero")

    price = MarketPrice(
        material=material,
        rate_per_kg=rate_per_kg,
        condition=condition,
        source=source,
        updated_at=datetime.utcnow(),
    )

    db.add(price)
    db.commit()
    db.refresh(price)

    return {
        "message": "Market price saved successfully",
        "price": price,
    }
