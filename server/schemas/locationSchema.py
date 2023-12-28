from pydantic import BaseModel


class CreateLocation(BaseModel):
    address: str
    class Config:
        from_attributes = True