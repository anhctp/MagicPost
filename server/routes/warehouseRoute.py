from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.warehouseController import WarehouseController
from schemas.warehouseSchema import CreateWarehouse, UpdateWarehouse
from models.warehouseModel import TypeWarehouse

router = APIRouter(
    tags=["Warehouses"],
    prefix="/warehouse",
    responses={404: {"description": "Not found"}},
)


@router.get("/find")
def get_all_warehouses(
    page: int = 1,
    size: int = 10,
    type: TypeWarehouse = None,
    db: Session = Depends(getDatabase),
):
    return WarehouseController.getAllWarehouse(page=page, size=size, type=type, db=db)


@router.get("/{warehouse_id}")
def get_warehouse_by_id(warehouse_id: int, db: Session = Depends(getDatabase)):
    return WarehouseController.getWarehouseById(warehouse_id=warehouse_id, db=db)


@router.get("/location/{location_id}")
def get_warehouse_by_location_id(location_id: int, db: Session = Depends(getDatabase)):
    return WarehouseController.getWarehouseByLocationId(location_id=location_id, db=db)


@router.post("/")
def create_warehouse(warehouse: CreateWarehouse, db: Session = Depends(getDatabase)):
    return WarehouseController.createWarehouse(warehouse=warehouse, db=db)


@router.put("/{warehouse_id}")
def update_warehouse(
    warehouse_id: int, newWarehouse: UpdateWarehouse, db: Session = Depends(getDatabase)
):
    return WarehouseController.updateWarehouse(
        warehouse_id=warehouse_id, newWarehouse=newWarehouse, db=db
    )


@router.delete("/{warehouse_id}")
def delete_warehouse(warehouse_id: int, db: Session = Depends(getDatabase)):
    return WarehouseController.deleteWarehouse(warehouse_id=warehouse_id, db=db)
