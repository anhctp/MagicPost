from fastapi import Depends
from sqlalchemy.orm import Session
from database import getDatabase
from models.trackingModel import TrackingModel
from schemas.trackingSchema import CreateTracking

class TrackingController:
    def getAllTracking(db: Session = Depends(getDatabase)):
        return db.query(TrackingModel).all()
    
    def createTracking(transaction_id: int, tracking: CreateTracking, db: Session = Depends(getDatabase)):
        db_tracking = TrackingModel(
            transaction_id=transaction_id,
            date=tracking.date,
            user_send=tracking.user_send,
            user_receive=tracking.user_receive,
        )
        db.add(db_tracking)
        db.commit()
        db.refresh(db_tracking)
        return db_tracking