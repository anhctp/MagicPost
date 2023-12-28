from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session, aliased
from database import getDatabase
from models.warehouseModel import WarehouseModel, TypeWarehouse
from models import locationModel, wardModel, districtModel, divisionModel
from schemas.warehouseSchema import CreateWarehouse, UpdateWarehouse


class WarehouseController:
    def getAllWarehouse(
        page: int = 1,
        size: int = 10,
        type: TypeWarehouse = None,
        db: Session = Depends(getDatabase),
    ):
        skip = (page - 1) * size
        division_alias = aliased(divisionModel.DivisionModel, name="division")
        district_alias = aliased(districtModel.DistrictModel, name="district")
        ward_alias = aliased(wardModel.WardModel, name="ward")
        location_alias = aliased(locationModel.LocationModel, name="location")
        warehouses = (
            db.query(
                WarehouseModel.id,
                WarehouseModel.type,
                location_alias.id.label("location_id"),
                location_alias.address.label("location_address"),
                ward_alias.id.label("ward_id"),
                ward_alias.name.label("ward_name"),
                district_alias.id.label("district_id"),
                district_alias.name.label("district_name"),
                division_alias.id.label("division_id"),
                division_alias.name.label("division_name"),
            )
            .join(location_alias, WarehouseModel.location_id == location_alias.id)
            .join(ward_alias, location_alias.ward_id == ward_alias.id)
            .join(district_alias, ward_alias.district_id == district_alias.id)
            .join(division_alias, district_alias.division_id == division_alias.id)
            .filter(WarehouseModel.type == type if type is not None else True)
            .offset(skip)
            .limit(size)
            .all()
        )
        result = []
        for item in warehouses:
            warehouse = {
                "id": item.id,
                "type": item.type,
                "location": {"id": item.location_id, "address": item.location_address},
                "ward": {
                    "id": item.ward_id,
                    "name": item.ward_name,
                },
                "district": {
                    "id": item.district_id,
                    "name": item.district_name,
                },
                "division": {
                    "id": item.division_id,
                    "name": item.division_name,
                },
            }
            result.append(warehouse)
        return result

    def getWarehouseById(warehouse_id: int, db: Session = Depends(getDatabase)):
        division_alias = aliased(divisionModel.DivisionModel, name="division")
        district_alias = aliased(districtModel.DistrictModel, name="district")
        ward_alias = aliased(wardModel.WardModel, name="ward")
        location_alias = aliased(locationModel.LocationModel, name="location")
        warehouse = (
            db.query(
                WarehouseModel.id,
                WarehouseModel.type,
                location_alias.id.label("location_id"),
                location_alias.address.label("location_address"),
                ward_alias.id.label("ward_id"),
                ward_alias.name.label("ward_name"),
                district_alias.id.label("district_id"),
                district_alias.name.label("district_name"),
                division_alias.id.label("division_id"),
                division_alias.name.label("division_name"),
            )
            .join(location_alias, WarehouseModel.location_id == location_alias.id)
            .join(ward_alias, location_alias.ward_id == ward_alias.id)
            .join(district_alias, ward_alias.district_id == district_alias.id)
            .join(division_alias, district_alias.division_id == division_alias.id)
            .filter(WarehouseModel.id == warehouse_id)
            .first()
        )
        if not warehouse:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )
        result = {
            "id": warehouse.id,
            "type": warehouse.type,
            "location": {
                "id": warehouse.location_id,
                "address": warehouse.location_address,
            },
            "ward": {
                "id": warehouse.ward_id,
                "name": warehouse.ward_name,
            },
            "district": {
                "id": warehouse.district_id,
                "name": warehouse.district_name,
            },
            "division": {
                "id": warehouse.division_id,
                "name": warehouse.division_name,
            },
        }
        return result

    def createWarehouse(warehouse: CreateWarehouse, db: Session = Depends(getDatabase)):
        db_warehouse = WarehouseModel(
            location_id=warehouse.location_id, type=warehouse.type
        )
        db.add(db_warehouse)
        db.commit()
        db.refresh(db_warehouse)
        return db_warehouse

    def updateWarehouse(
        warehouse_id: int,
        newWarehouse: UpdateWarehouse,
        db: Session = Depends(getDatabase),
    ):
        warehouse = (
            db.query(WarehouseModel).filter(WarehouseModel.id == warehouse_id).first()
        )
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
        warehouse = (
            db.query(WarehouseModel).filter(WarehouseModel.id == warehouse_id).first()
        )
        if not warehouse:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )
        db.delete(warehouse)
        db.commit()
        return {"detail": "Deleted"}
