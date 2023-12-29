from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.trackingController import TrackingController


router = APIRouter(
    tags=["Tracking"],
    prefix="/tracking",
    responses={404: {"description": "Not found"}},
)

@router.get("/get_transaction/{transaction_id}")
def get_tracking_by_transaction_id(transaction_code: str, db: Session = Depends(getDatabase)):
    return TrackingController.getTrackingByTransactionId(transaction_code=transaction_code, db=db)