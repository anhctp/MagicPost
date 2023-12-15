from fastapi import Depends
from sqlalchemy.orm import Session
from database import getDatabase
from models.locationModel import LocationModel
from schemas.locationSchema import CreateLocation

class LocationController:
    def getAllLocation(db: Session = Depends(getDatabase)):
        return db.query(LocationModel).all()
    
    def createLocation(ward_id: int, location: CreateLocation, db: Session = Depends(getDatabase)):
        db_location = LocationModel(
            ward_id=ward_id,
            address=location.address
        )
        db.add(db_location)
        db.commit()
        db.refresh(db_location)
        return db_location