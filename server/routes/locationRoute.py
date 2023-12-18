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
def get_all_location(page: int = 1, size: int = 10, db: Session = Depends(getDatabase)):
    return LocationController.getAllLocation(page=page, size=size, db=db)

@router.get("/data")
async def set_data(db: Session = Depends(getDatabase)):
    return await LocationController.set_data(db=db)

@router.get("/{location_id}")
def get_location_by_id(location_id: int, db: Session = Depends(getDatabase)):
    return LocationController.getLocationById(location_id=location_id, db=db)


@router.post("/{ward_id}")
def create_location(ward_id: int, location: CreateLocation, db: Session = Depends(getDatabase)):
    return LocationController.createLocation(ward_id=ward_id, location=location, db=db)