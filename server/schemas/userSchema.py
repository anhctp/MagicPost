from pydantic import BaseModel, validator, EmailStr
from datetime import date
from typing import Optional
from models.userModel import Gender, UserRole

class Login(BaseModel):
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    password: str

    @validator('email')
    def check_either_email_or_phone(cls, email, values):
        if email is None and values.get('phone') is None:
            raise ValueError('Either email or phone must be provided')
        return email

class RegisterUser(BaseModel):
    fullname: str
    phone: str
    image_path: str
    email: EmailStr
    password: str
    date_of_birth: date
    gender: Gender
    role: UserRole

    class Config:
        from_attributes = True