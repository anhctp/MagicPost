import enum
import database
from sqlalchemy import Column, Integer, Enum, ForeignKey

class TypeWarehouse(str, enum.Enum):
    TRANSACTION = "Transaction offices"
    GATHERING = "Gathering points"

class WarehouseModel(database.Base):
    __tablename__ = "warehouses"
    id = Column(Integer, primary_key=True)
    location_id = Column(Integer, ForeignKey("locations.id"))
    type = Column(Enum(TypeWarehouse))