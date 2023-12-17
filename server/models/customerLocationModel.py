import database
from sqlalchemy import Column, ForeignKey, Integer, String

class CustomerLocationModel(database.Base):
    __tablename__ = "customer_locations"
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    location_id = Column(Integer, ForeignKey("locations.id"))