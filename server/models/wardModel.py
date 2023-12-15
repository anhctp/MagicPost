import database
from sqlalchemy import Column, Integer, String, ForeignKey

class WardModel(database.Base):
    __tablename__ = "wards"
    id = Column(Integer, primary_key=True)
    district_id = Column(Integer, ForeignKey("districts.id"))
    name = Column(String(300))
    type = Column(String(100))