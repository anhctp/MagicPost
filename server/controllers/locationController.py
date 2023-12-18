from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session, aliased
from database import getDatabase
from models.locationModel import LocationModel
from models.divisionModel import DivisionModel
from models.districtModel import DistrictModel
from models.wardModel import WardModel
from models.warehouseModel import WarehouseModel, TypeWarehouse
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
    def getAllLocation(page: int = 1, size: int = 10, db: Session = Depends(getDatabase)):
        skip = (page - 1) * size
        division_alias = aliased(DivisionModel, name="division")
        district_alias = aliased(DistrictModel, name="district")
        ward_alias = aliased(WardModel, name="ward")
        locations = (
            db.query(
                LocationModel.id,
                LocationModel.address,
                ward_alias.name.label('ward_name'),
                ward_alias.id.label('ward_id'),
                district_alias.name.label('district_name'),
                district_alias.id.label('district_id'),
                division_alias.id.label('division_id'),
                division_alias.name.label('division_name')
            )
            .join(ward_alias, LocationModel.ward_id == ward_alias.id)
            .join(district_alias, ward_alias.district_id == district_alias.id)
            .join(division_alias, district_alias.division_id == division_alias.id)
            .offset(skip)
            .limit(size)
            .all())
        result = []
        for item in locations:
            location = {
            "id": item.id,
            "address": item.address,
            "ward": {
                "id": item.ward_id,
                "name": item.ward_name
                },
            "district": {
                "id": item.district_id,
                "name": item.district_name
                },
            "division": {
                "id": item.division_id,
                "name": item.division_name
                }
        }
            result.append(location)
        return result
    def getLocationById(location_id: int, db: Session = Depends(getDatabase)):
        division_alias = aliased(DivisionModel, name="division")
        district_alias = aliased(DistrictModel, name="district")
        ward_alias = aliased(WardModel, name="ward")

        location_info = (
            db.query(
                LocationModel.id,
                LocationModel.address,
                ward_alias.name.label('ward_name'),
                ward_alias.id.label('ward_id'),
                district_alias.name.label('district_name'),
                district_alias.id.label('district_id'),
                division_alias.id.label('division_id'),
                division_alias.name.label('division_name')
            )
            .join(ward_alias, LocationModel.ward_id == ward_alias.id)
            .join(district_alias, ward_alias.district_id == district_alias.id)
            .join(division_alias, district_alias.division_id == division_alias.id)
            .filter(LocationModel.id == location_id)
            .first()
        )
        if not location_info:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )
        result =  {
            "id": location_info.id,
            "address": location_info.address,
            "ward": {
                "id": location_info.ward_id,
                "name": location_info.ward_name
                },
            "district": {
                "id": location_info.district_id,
                "name": location_info.district_name
                },
            "division": {
                "id": location_info.division_id,
                "name": location_info.division_name
                }
        }
        return result
    
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
        try:
            data = await get_data_from_api()
            with db.begin():
                for division in data:
                    db_division = DivisionModel(
                        name=division["name"],
                        type=division["division_type"]
                    )
                    db.add(db_division)
                    db.flush()
                    for district in division["districts"]:
                        db_district = DistrictModel(
                            division_id=db_division.id,
                            name=district["name"],
                            type=district["division_type"]
                        )
                        db.add(db_district)
                        db.flush()
                        for ward in district["wards"]:
                            db_ward = WardModel(
                                district_id=db_district.id,
                                name=ward["name"],
                                type=ward["division_type"]
                            )
                            db.add(db_ward)
                            db.flush()
                            db_location = LocationModel(
                                ward_id=db_ward.id,
                            )
                            db.add(db_location)
                            db.flush()

                            db_warehouse = WarehouseModel(
                                location_id=db_location.id,
                                type=TypeWarehouse.TRANSACTION
                            )
                            db.add(db_warehouse)
                            db.flush()
                            if db_ward.type == "thị trấn":
                                db_warehouseg = WarehouseModel(
                                    location_id=db_location.id,
                                    type=TypeWarehouse.GATHERING
                                )
                                db.add(db_warehouseg)
                                db.flush()
            return {"detail": "successful!"}

        except Exception as error:
            raise HTTPException(status_code=500, detail=f"Network error: {str(error)}")
