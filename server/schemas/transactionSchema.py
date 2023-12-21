from enum import Enum
from typing import Optional
from pydantic import BaseModel
from datetime import date
from models.transactionModel import TransactionStatus
from models.transactionDetailModel import ItemType, ItemReturn
from schemas.customerSchema import Customer, CustomerLocation
from datetime import datetime

class CreateTransaction(BaseModel):
    sender_info: Customer
    receiver_info: Customer
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

class UpdateTransaction(BaseModel):
    status: TransactionStatus
    date: datetime