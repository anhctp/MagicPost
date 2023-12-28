from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import getDatabase
from models.wardModel import WardModel


class WardController:
    def getAllWardByDistrictId(district_id: int, db: Session = Depends(getDatabase)):
        wards = (
            db.query(
                WardModel.id,
                WardModel.name,
            )
            .filter(WardModel.district_id == district_id)
            .all()
        )
        if not wards:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )
        result = []
        for ward_info in wards:
            ward = {
                "id": ward_info[0],
                "name": ward_info[1],
            }
            result.append(ward)
        return result
