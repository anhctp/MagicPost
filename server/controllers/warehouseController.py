from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session, aliased
from database import getDatabase
from models.warehouseModel import WarehouseModel, TypeWarehouse
from models import locationModel, wardModel, districtModel, divisionModel
from schemas.warehouseSchema import CreateWarehouse, UpdateWarehouse

class WarehouseController:
    def getAllWarehouse(page: int = 1, size: int = 10, type: TypeWarehouse = None, db: Session = Depends(getDatabase)):
        skip = (page - 1) * size
        division_alias = aliased(divisionModel.DivisionModel)
        district_alias = aliased(districtModel.DistrictModel)
        ward_alias = aliased(wardModel.WardModel)
        warehouses = (
            db.query(WarehouseModel.id, WarehouseModel.type, WarehouseModel.location_id, locationModel.LocationModel.address, ward_alias.name.label('ward_name'), district_alias.name.label('district_name'), division_alias.name.label('division_name'))
            .join(locationModel.LocationModel, WarehouseModel.location_id == locationModel.LocationModel.id)
            .join(wardModel.WardModel, locationModel.LocationModel.ward_id == wardModel.WardModel.id)
            .join(districtModel.DistrictModel, wardModel.WardModel.district_id == districtModel.DistrictModel.id)
            .join(divisionModel.DivisionModel, districtModel.DistrictModel.division_id == divisionModel.DivisionModel.id)
            .filter(WarehouseModel.type == type if type is not None else True)
            .offset(skip)
            .limit(size)
            .all())
        result = []
        for item in warehouses:
            warehouse = {
                "id": item.id,
                "location_id": item.location_id,
                "type": item.type,
                "address": item.address,
                "ward": item.ward_name,
                "district": item.district_name,
                "division": item.division_name,
            }
            result.append(warehouse)
        return result
    
    def getWarehouseById(warehouse_id: int, db: Session = Depends(getDatabase)):
        division_alias = aliased(divisionModel.DivisionModel)
        district_alias = aliased(districtModel.DistrictModel)
        ward_alias = aliased(wardModel.WardModel)
        warehouse = (
            db.query(WarehouseModel.id, WarehouseModel.type, WarehouseModel.location_id,locationModel.LocationModel.address, ward_alias.name.label('ward_name'), district_alias.name.label('district_name'), division_alias.name.label('division_name'))
            .join(locationModel.LocationModel, WarehouseModel.location_id == locationModel.LocationModel.id)
            .join(wardModel.WardModel, locationModel.LocationModel.ward_id == wardModel.WardModel.id)
            .join(districtModel.DistrictModel, wardModel.WardModel.district_id == districtModel.DistrictModel.id)
            .join(divisionModel.DivisionModel, districtModel.DistrictModel.division_id == divisionModel.DivisionModel.id)
            .filter(WarehouseModel.id == warehouse_id)
            .first())
        if not warehouse:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )
        result = {
            "id": warehouse.id,
            "location_id": warehouse.location_id,
            "type": warehouse.type,
            "address": warehouse.address,                
            "ward": warehouse.ward_name,
            "district": warehouse.district_name,
            "division": warehouse.division_name,
        }
        return result
    
    def createWarehouse(warehouse: CreateWarehouse, db: Session = Depends(getDatabase)):
        db_warehouse = WarehouseModel(
            location_id=warehouse.location_id,
            type=warehouse.type
        )
        db.add(db_warehouse)
        db.commit()
        db.refresh(db_warehouse)
        return db_warehouse
    
    def updateWarehouse(warehouse_id: int, newWarehouse: UpdateWarehouse, db: Session = Depends(getDatabase)):
        warehouse = db.query(WarehouseModel).filter(WarehouseModel.id == warehouse_id).first()
        if not warehouse:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )

        for var, value in vars(newWarehouse).items():
            if value is not None:
                setattr(warehouse, var, value)
        db.commit()
        db.refresh(warehouse)
        return warehouse
    
    def deleteWarehouse(warehouse_id: int, db: Session = Depends(getDatabase)):
        warehouse = db.query(WarehouseModel).filter(WarehouseModel.id == warehouse_id).first()
        if not warehouse:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )
        db.delete(warehouse)
        db.commit()
        return {"detail": "Deleted"}