import enum
import database
from sqlalchemy import Column, Integer, Date, Enum, ForeignKey, String
from datetime import date

class TransactionType(str, enum.Enum):
    DELIVER = "Deliver"
    RETURN = "Return"

class TransactionStatus(str, enum.Enum):
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"

class TransactionModel(database.Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    code = Column(String(15), nullable= False, index=True)
    sender_location_id = Column(Integer, ForeignKey("customer_locations.id"))
    receiver_location_id = Column(Integer, ForeignKey("customer_locations.id"))
    transaction_send_date = Column(Date(), default=date)
    transaction_receive_date = Column(Date(), nullable=True)
    transaction_type = Column(Enum(TransactionType))
    status = Column(Enum(TransactionStatus))