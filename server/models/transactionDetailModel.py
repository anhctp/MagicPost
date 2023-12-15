import enum
import database
from sqlalchemy import Column, Integer, Enum, ForeignKey, Text, Float

class ItemType(str, enum.Enum):
    DOCUMENTS = "documents"
    GOODS = "goods"

class ItemReturn(str, enum.Enum):
    RETURN = "return"
    RETURN_EXPIRATION = "return expiration"
    CALL_SENDER = "call sender"
    CANCEL = "cancel"

class TransactionDetailModel(database.Base):
    __tablename__ = "transaction_details"
    transaction_id = Column(Integer, ForeignKey("transactions.id"), primary_key=True)
    item_type = Column(Enum(ItemType))
    item_description = Column(Text)
    item_quantity = Column(Integer, default=1)
    item_weight = Column(Float, default=0)
    item_value = Column(Integer, default=0)
    item_attached = Column(Text, default="")
    item_return = Column(Enum(ItemReturn))
    cod = Column(Float, default=0)
    other_revenue = Column(Float, default=0)