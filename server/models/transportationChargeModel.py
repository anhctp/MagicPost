import database
from sqlalchemy import Column, Integer, ForeignKey, Float

class TransportationChargeModel(database.Base):
    __tablename__ = "transportation_charges"
    transaction_id = Column(Integer, ForeignKey("transactions.id"), primary_key=True)
    base = Column(Float, default=0)
    surcharge = Column(Float, default=0)
    vat = Column(Float, default=0)
    other = Column(Float, default=0)
