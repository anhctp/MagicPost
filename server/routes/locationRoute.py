from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.locationController import LocationController
from schemas.locationSchema import CreateLocation

router = APIRouter(
    tags=["Locations"],
    prefix="/location",
    responses={404: {"description": "Not found"}},
)

@router.get("/")
def get_all_location(db: Session = Depends(getDatabase)):
    return LocationController.getAllLocation(db=db)

@router.post("/{ward_id}")
def create_location(ward_id: int, location: CreateLocation, db: Session = Depends(getDatabase)):
    return LocationController.createLocation(ward_id=ward_id, location=location, db=db)