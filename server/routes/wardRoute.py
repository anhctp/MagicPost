from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.wardController import WardController

router = APIRouter(
    tags=["Wards"],
    prefix="/ward",
    responses={404: {"description": "Not found"}},
)


@router.get("/{district_id}")
def get_all_ward_by_district_id(district_id: int, db: Session = Depends(getDatabase)):
    return WardController.getAllWardByDistrictId(district_id=district_id, db=db)
