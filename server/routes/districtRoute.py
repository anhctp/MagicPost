from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.districtController import DistrictController

router = APIRouter(
    tags=["Districts"],
    prefix="/district",
    responses={404: {"description": "Not found"}},
)


@router.get("/{division_id}")
def get_all_district_by_division_id(
    division_id: int, db: Session = Depends(getDatabase)
):
    return DistrictController.getAllDistrictByDivisionId(division_id=division_id, db=db)
