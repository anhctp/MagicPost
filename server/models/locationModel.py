import database
from sqlalchemy import Column, Integer, String, ForeignKey

class LocationModel(database.Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True)
    ward_id = Column(Integer, ForeignKey("wards.id"))
    address = Column(String(100), nullable=True)