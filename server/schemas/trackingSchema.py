from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from models.trackingModel import TrackingModel

class CreateTracking(BaseModel):
    date: datetime
    user_send: int
    user_receive: Optional[int] = None