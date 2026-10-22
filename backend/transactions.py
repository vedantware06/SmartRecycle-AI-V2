
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from backend.database import SessionLocal
from backend.models import MarketPrice, Stock, Transaction

router = APIRouter(prefix="/transactions", tags=["Transactions"])

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "uploads" / "transactions"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def list_transactions(db: Session = Depends(get_db)):
    return (
        db.query(Transaction)
        .order_by(Transaction.created_at.desc())
        .all()
    )


@router.post("/")
async def create_transaction(
    transaction_type: str = Form(...),
    material: str = Form(...),
    quantity_kg: float = Form(...),
    rate_per_kg: float = Form(...),
    condition: str = Form("Average"),
    party_name: str = Form(""),
    notes: str = Form(""),
    photo: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    transaction_type = transaction_type.strip().title()
    material = material.strip()

    if transaction_type not in {"Purchase", "Sale"}:
        raise HTTPException(400, "Type must be Purchase or Sale")

    if not material:
        raise HTTPException(400, "Material is required")

    if quantity_kg <= 0 or rate_per_kg < 0:
        raise HTTPException(400, "Quantity must be positive and rate cannot be negative")

    market = (
        db.query(MarketPrice)
        .filter(MarketPrice.material == material)
        .order_by(MarketPrice.updated_at.desc())
        .first()
    )

    market_rate = market.rate_per_kg if market else rate_per_kg
    total = round(quantity_kg * rate_per_kg, 2)
    saved_photo_path = None

    if photo and photo.filename:
        if photo.content_type not in ALLOWED_TYPES:
            raise HTTPException(400, "Photo must be JPG, PNG or WEBP")

        contents = await photo.read(MAX_FILE_SIZE + 1)
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(400, "Photo must be 5 MB or smaller")

        extension = {
            "image/jpeg": ".jpg",
            "image/png": ".png",
            "image/webp": ".webp",
        }[photo.content_type]

        filename = f"{uuid4().hex}{extension}"
        (UPLOAD_DIR / filename).write_bytes(contents)
        saved_photo_path = f"uploads/transactions/{filename}"

    stock = (
        db.query(Stock)
        .filter(Stock.material == material)
        .first()
    )

    try:
        if transaction_type == "Purchase":
            if stock is None:
                stock = Stock(material=material, quantity_kg=0)
                db.add(stock)
            stock.quantity_kg += quantity_kg
        else:
            if stock is None or stock.quantity_kg < quantity_kg:
                raise HTTPException(400, "Not enough stock for this sale")
            stock.quantity_kg -= quantity_kg

        transaction = Transaction(
            transaction_type=transaction_type,
            material=material,
            quantity_kg=quantity_kg,
            rate_per_kg=rate_per_kg,
            market_rate_at_transaction=market_rate,
            total_amount=total,
            condition=condition,
            photo_path=saved_photo_path,
            party_name=party_name or None,
            notes=notes or None,
        )

        db.add(transaction)
        db.commit()
        db.refresh(transaction)
        return transaction

    except Exception:
        db.rollback()
        if saved_photo_path:
            (BASE_DIR / saved_photo_path).unlink(missing_ok=True)
        raise
