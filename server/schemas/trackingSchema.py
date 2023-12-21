from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from models.trackingModel import SendType, TrackingModel

class CreateTracking(BaseModel):
    date: datetime
    user_send: int
    user_receive: Optional[int] = None
    send_location_id: int
    receive_location_id: int
    send_type: SendType


class UpdateTracking(BaseModel):
    user_send: int
    user_receive: int