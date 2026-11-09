
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models import Stock

router = APIRouter(prefix="/stock", tags=["Stock Management"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Get all stock records
@router.get("/")
def get_stock(db: Session = Depends(get_db)):
    stock_items = (
        db.query(Stock)
        .order_by(Stock.material.asc())
        .all()
    )

    return stock_items


# Get total stock summary
@router.get("/summary")
def get_stock_summary(db: Session = Depends(get_db)):
    stock_items = db.query(Stock).all()

    total_materials = len(stock_items)
    total_quantity = sum(item.quantity_kg for item in stock_items)

    return {
        "total_materials": total_materials,
        "total_quantity_kg": round(total_quantity, 2),
        "items": stock_items,
    }
