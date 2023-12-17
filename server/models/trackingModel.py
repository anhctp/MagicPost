import database
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime

class TrackingModel(database.Base):
    __tablename__ = "trackings"
    transaction_id = Column(Integer, ForeignKey("transactions.id"), primary_key=True)
    date = Column(DateTime, default=datetime.now())
    user_send = Column(Integer, nullable=False)
    user_receive = Column(Integer, nullable=True)