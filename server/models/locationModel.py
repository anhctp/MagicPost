import database
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint

class LocationModel(database.Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True, unique=True)
    ward_id = Column(Integer, ForeignKey("wards.id"))
    address = Column(String(100), nullable=True)
    __table_args__ = (UniqueConstraint('ward_id', 'address', name='_ward_address_uc'),)