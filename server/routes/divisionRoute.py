from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.divisionController import DivisionController

router = APIRouter(
    tags=["Divisions"],
    prefix="/division",
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_all_division(db: Session = Depends(getDatabase)):
    return DivisionController.getAllDivision(db=db)


@router.get("/{division_id}")
def get_division_by_id(division_id: int, db: Session = Depends(getDatabase)):
    return DivisionController.getDivisionById(division_id=division_id, db=db)
