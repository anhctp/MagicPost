import enum
import database
from sqlalchemy import Column, Integer, String, Date, Enum, ForeignKey, Text
from datetime import date

class Gender(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"
    SECRETE = "secrete"

class UserRole(str, enum.Enum):
    CEO = "CEO"
    STAFFTRANSACTION = "Staff Transaction"
    STAFFGATHERING = "Staff Gathering"
    LEADERTRANSACTION = "Leader Transaction"
    LEADERGATHERING = "Leader Gathering"

class UserModel(database.Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    warehouses_id = Column(Integer, ForeignKey("warehouses.id"), nullable=False)
    fullname = Column(String(50))
    phone = Column(String(10), unique=True)
    image_path = Column(String(100))
    email = Column(String(50), unique=True)
    password = Column(Text)
    date_of_birth = Column(Date(), default=date)
    gender = Column(Enum(Gender))
    role = Column(Enum(UserRole))