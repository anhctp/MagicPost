import database
from sqlalchemy import Column, ForeignKey, Integer, String

class CustomerModel(database.Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(50))
    phone = Column(String(10))
    location_id = Column(Integer, ForeignKey("locations.id"), index=True)