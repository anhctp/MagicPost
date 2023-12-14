import enum
import database
from sqlalchemy import Column, Integer, String, Date, Enum
from datetime import date

class Gender(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"
    SECRETE = "secrete"

class UserRole(str, enum.Enum):
    SEO = "SEO"
    STAFFTRANSACTION = "Staff Transaction"
    STAFFGATHERING = "Staff Gathering"
    LEADERTRANSACTION = "Leader Transaction"
    LEADERGATHERING = "Leader Gathering"

class UserModel(database.Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(50))
    phone = Column(String(10), unique=True)
    image_path = Column(String(100))
    email = Column(String(50), unique=True)
    password = Column(String(300))
    date_of_birth = Column(Date(), default=date)
    gender = Column(Enum(Gender))
    role = Column(Enum(UserRole))