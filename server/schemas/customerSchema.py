from pydantic import BaseModel

class Customer(BaseModel):
    fullname: str
    phone: str
    location_id: int

class CreateCustomer(Customer):
    class Config:
        from_attributes = True

class CustomerLocation(Customer):
    location_id: int