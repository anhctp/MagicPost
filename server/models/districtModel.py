import database
from sqlalchemy import Column, Integer, String, ForeignKey

class DistrictnModel(database.Base):
    __tablename__ = "districts"
    id = Column(Integer, primary_key=True)
    division_id = Column(Integer, ForeignKey("divisions.id"))
    name = Column(String(300))
    type = Column(String(100))