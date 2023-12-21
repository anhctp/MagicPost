import enum
import database
from sqlalchemy import Column, Integer, Date, Enum, ForeignKey, String
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from datetime import datetime

class SendType(str, enum.Enum):
    FORWARD = "forward"
    BACKWARD = "backward"
    GG = "gg"

class TrackingModel(database.Base):
    __tablename__ = "trackings"
    id = Column(Integer, primary_key=True, unique=True)
    transaction_id = Column(Integer, ForeignKey("transactions.id"))
    date = Column(DateTime, default=datetime.now())
    user_send = Column(Integer, nullable=False)
    user_receive = Column(Integer, nullable=True)
    send_location_id = Column(Integer, nullable=False)
    receive_location_id = Column(Integer, nullable=False)
    send_type = Column(Enum(SendType))