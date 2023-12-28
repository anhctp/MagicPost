from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import getDatabase
from models.districtModel import DistrictModel


class DistrictController:
    def getAllDistrictByDivisionId(
        division_id: int, db: Session = Depends(getDatabase)
    ):
        districts = (
            db.query(
                DistrictModel.id,
                DistrictModel.name,
            )
            .filter(DistrictModel.division_id == division_id)
            .all()
        )
        if not districts:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )
        result = []
        for district_info in districts:
            district = {
                "id": district_info[0],
                "name": district_info[1],
            }
            result.append(district)
        return result
