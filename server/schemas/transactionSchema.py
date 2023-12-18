from typing import Optional
from pydantic import BaseModel
from datetime import date
from models.transactionDetailModel import ItemType, ItemReturn
from schemas.customerSchema import CustomerLocation

class CreateTransaction(BaseModel):
    sender_info: CustomerLocation
    receiver_info: CustomerLocation
    transaction_send_date: Optional[date] = None
    transaction_receive_date: Optional[date] = None

    class Config:
        from_attributes = True

class CreateTransactionDetail(BaseModel):
    item_type: ItemType
    item_description: str = ""
    item_quantity: Optional[int] = 1
    item_weight: Optional[float] = 0
    item_value: Optional[int] = 0
    item_attached: Optional[str] = ""
    item_return: ItemReturn
    cod: Optional[float] = 0
    other_revenue: Optional[float] = 0