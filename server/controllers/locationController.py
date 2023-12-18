from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database import getDatabase
from models.locationModel import LocationModel
from models.divisionModel import DivisionModel
from models.districtModel import DistrictModel
from models.wardModel import WardModel
from schemas.locationSchema import CreateLocation
import httpx

async def get_data_from_api():
    api_url = "https://provinces.open-api.vn/api/?depth=3"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(api_url)
            if response.status_code == 200:
                data = response.json()
                return data
            else:
                raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch data from API: {response.text}")
        except httpx.RequestError as error:
            raise HTTPException(status_code=500, detail=f"Network error: {str(error)}")
        
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
    
            
    async def set_data(db: Session = Depends(getDatabase)):
        data = await get_data_from_api()
        for division in data:
            db_division = DivisionModel(
                name=division["name"],
                type=division["division_type"]
            )
            db.add(db_division)
            db.commit()
            db.refresh(db_division)
            for district in division["districts"]:
                db_district = DistrictModel(
                    division_id=db_division.id,
                    name=district["name"],
                    type=district["division_type"]
                )
                db.add(db_district)
                db.commit()
                db.refresh(db_district)
                for ward in district["wards"]:
                    db_ward = WardModel(
                        district_id=db_district.id,
                        name=ward["name"],
                        type=ward["division_type"]
                    )
                    db.add(db_ward)
                    db.commit()
                    db.refresh(db_ward)

                    db_location = LocationModel(
                        ward_id=db_ward.id,
                    )
                    db.add(db_location)
                    db.commit()
                    db.refresh(db_location)
