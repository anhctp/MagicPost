from pydantic import BaseModel
from typing import Optional

from models.warehouseModel import TypeWarehouse

class CreateWarehouse(BaseModel):
    location_id: int
    type: TypeWarehouse
    
    class Config:
        from_attributes = True


class UpdateWarehouse(BaseModel):
    location_id: Optional[int] = None
    type: Optional[TypeWarehouse] = None

    class Config:
        from_attributes = True