from fastapi import Depends
from sqlalchemy.orm import Session
from database import getDatabase
from models.divisionModel import DivisionModel


class DivisionController:
    def getAllDivision(db: Session = Depends(getDatabase)):
        return db.query(DivisionModel).all()

    def getDivisionById(division_id: int, db: Session = Depends(getDatabase)):
        return db.query(DivisionModel).filter(DivisionModel.id == division_id).first()
