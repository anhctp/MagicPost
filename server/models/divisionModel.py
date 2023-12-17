import database
from sqlalchemy import Column, Integer, String

class DivisionModel(database.Base):
    __tablename__ = "divisions"
    id = Column(Integer, primary_key=True)
    name = Column(String(300), index=True)
    type = Column(String(100))