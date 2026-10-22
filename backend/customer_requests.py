
from datetime import datetime
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import CustomerScrapRequest

router = APIRouter(
    prefix="/customer-requests",
    tags=["Customer Scrap Requests"]
)

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "uploads" / "scrap_requests"
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB

ALLOWED_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp"
}


class ScrapRequestCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=150)
    mobile_number: str = Field(min_length=10, max_length=20)
    material: str = Field(min_length=1, max_length=100)
    estimated_quantity_kg: float = Field(gt=0)
    pickup_method: str
    pickup_address: str | None = None
    customer_notes: str | None = None


class StatusUpdate(BaseModel):
    status: str


@router.post("/")
def create_scrap_request(
    request: ScrapRequestCreate,
    db: Session = Depends(get_db)
):
    if request.pickup_method not in ["Home Pickup", "Shop Drop-off"]:
        raise HTTPException(
            status_code=400,
            detail="Choose Home Pickup or Shop Drop-off"
        )

    if (
        request.pickup_method == "Home Pickup"
        and not (request.pickup_address or "").strip()
    ):
        raise HTTPException(
            status_code=400,
            detail="Address is required for Home Pickup"
        )

    new_request = CustomerScrapRequest(
        customer_name=request.customer_name,
        mobile_number=request.mobile_number,
        material=request.material,
        estimated_quantity_kg=request.estimated_quantity_kg,
        pickup_method=request.pickup_method,
        pickup_address=request.pickup_address,
        customer_notes=request.customer_notes,
        condition="Pending inspection",
        status="Pending",
        created_at=datetime.utcnow()
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    return {
        "message": "Scrap request submitted successfully",
        "request_id": new_request.id,
        "status": new_request.status
    }


@router.get("/")
def list_scrap_requests(db: Session = Depends(get_db)):
    requests = (
        db.query(CustomerScrapRequest)
        .order_by(CustomerScrapRequest.created_at.desc())
        .all()
    )

    return [
        {
            "id": item.id,
            "customer_name": item.customer_name,
            "mobile_number": item.mobile_number,
            "material": item.material,
            "estimated_quantity_kg": item.estimated_quantity_kg,
            "condition": item.condition,
            "photo_path": item.photo_path,
            "pickup_method": item.pickup_method,
            "pickup_address": item.pickup_address,
            "offered_rate_per_kg": item.offered_rate_per_kg,
            "status": item.status,
            "customer_notes": item.customer_notes,
            "created_at": item.created_at.isoformat()
        }
        for item in requests
    ]


@router.post("/{request_id}/photo")
async def upload_scrap_photo(
    request_id: int,
    photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    item = db.query(CustomerScrapRequest).filter(
        CustomerScrapRequest.id == request_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Scrap request not found"
        )

    extension = ALLOWED_TYPES.get(photo.content_type or "")

    if not extension:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG, and WEBP images are allowed"
        )

    content = await photo.read(MAX_FILE_SIZE + 1)

    if not content:
        raise HTTPException(
            status_code=400,
            detail="The uploaded image is empty"
        )

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Image must be 5 MB or smaller"
        )

    # Check that the file contents match the claimed image type.
    valid_image = (
        (extension == ".jpg" and content.startswith(b"\xff\xd8\xff"))
        or (extension == ".png" and content.startswith(b"\x89PNG\r\n\x1a\n"))
        or (extension == ".webp"
            and content.startswith(b"RIFF")
            and content[8:12] == b"WEBP")
    )

    if not valid_image:
        raise HTTPException(
            status_code=400,
            detail="The file is not a valid supported image"
        )

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    filename = f"{uuid4().hex}{extension}"
    destination = UPLOAD_DIR / filename

    destination.write_bytes(content)

    item.photo_path = f"uploads/scrap_requests/{filename}"

    try:
        db.commit()
        db.refresh(item)
    except Exception:
        db.rollback()
        destination.unlink(missing_ok=True)
        raise HTTPException(
            status_code=500,
            detail="Could not save the photo information"
        )

    return {
        "message": "Scrap photo uploaded successfully",
        "request_id": item.id,
        "photo_path": item.photo_path
    }


@router.patch("/{request_id}/status")
def update_request_status(
    request_id: int,
    update: StatusUpdate,
    db: Session = Depends(get_db)
):
    allowed_statuses = [
        "Pending",
        "Approved",
        "Collected",
        "Rejected"
    ]

    if update.status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Status must be one of: {', '.join(allowed_statuses)}"
        )

    item = db.query(CustomerScrapRequest).filter(
        CustomerScrapRequest.id == request_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Scrap request not found"
        )

    item.status = update.status
    db.commit()
    db.refresh(item)

    return {
        "message": "Request status updated successfully",
        "request_id": item.id,
        "status": item.status
    }
