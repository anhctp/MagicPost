from pydantic import BaseModel

class Customer(BaseModel):
    fullname: str
    phone: str

class CreateCustomer(Customer):
    class Config:
        from_attributes = True

class CustomerLocation(Customer):
    location_id: int