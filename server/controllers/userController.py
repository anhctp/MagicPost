from datetime import datetime, timedelta
from jwt import PyJWTError
import jwt
from sqlalchemy.orm import Session
from database import getDatabase
from fastapi.security import HTTPBearer
from fastapi import Depends, HTTPException, status
from passlib.context import CryptContext
from models.userModel import UserModel, UserRole
from schemas.userSchema import RegisterUser, Login
from dotenv import load_dotenv
import os
from fastapi.security import HTTPBearer
from controllers.warehouseController import WarehouseController


load_dotenv()

# token
reusable_oauth2 = HTTPBearer(scheme_name="Authorization")


def createAccessToken(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        days=int(os.getenv("ACCESS_TOKEN_EXPIRE_DAYS"))
    )
    to_encode.update({"exp": expire})
    to_encode.update({ "alg": "HS256"})
    encoded_jwt = jwt.encode(
        to_encode, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM")
    )
    return encoded_jwt



def verifyToken(db: Session = Depends(getDatabase), data=Depends(reusable_oauth2)):
    try:
        payload = jwt.decode(
            data.credentials, os.getenv("SECRET_KEY"), algorithms=os.getenv("ALGORITHM")
        )
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate email",
                headers={"WWW-Authenticate": "Bearer"},
            )
        token_data = email
    except PyJWTError as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = UserController.getUserByEmail(email=token_data, db=db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate user",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


# hashing password
pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")


def bcrypt(password: str):
    return pwd_cxt.hash(password)


def verify(hashed_password, plain_password):
    return pwd_cxt.verify(plain_password, hashed_password)


class UserController:
    def getAllUser(db: Session = Depends(getDatabase)):
        return db.query(UserModel).all()

    def getUserById(userId: int, db: Session = Depends(getDatabase)):
        return db.query(UserModel).filter(UserModel.id == userId).first()
    
    def getUserByEmail(email: str, db: Session = Depends(getDatabase)):
        return db.query(UserModel).filter(UserModel.email == email).first()
    
    def findUserByRole(role: UserRole, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        if role == UserRole.CEO:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=f"Cannot access to CEO role"
            )
        if (role == UserRole.LEADERGATHERING or role == UserRole.LEADERTRANSACTION) and current_user.role != UserRole.CEO:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Only the CEO is granted access!"
            )
        user = db.query(UserModel).filter(UserModel.role == role).first()
        if not user:
            return {}
        location = WarehouseController.getWarehouseById(user.warehouses_id)
        return {
            "user": user,
            "location": location
        }
    

    def createUser(user: RegisterUser, db: Session = Depends(getDatabase)):
        if user.role == UserRole.LEADERGATHERING or user.role == UserRole.LEADERTRANSACTION:
            checkDupplicate = db.query(UserModel).filter(UserModel.role == user.role, UserModel.warehouses_id == user.warehouses_id).first()
            if checkDupplicate:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST, detail=f"Leader existed!"
                )
        db_user = UserModel(
            warehouses_id=user.warehouses_id,
            fullname=user.fullname,
            image_path=user.image_path,
            email=user.email,
            password=bcrypt(user.password),
            date_of_birth=user.date_of_birth,
            gender=user.gender,
            role=user.role,
            phone=user.phone,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        access_token = createAccessToken(data={"sub": user.email})
        db_user.password = "hashed"
        return {
            "user": db_user,
            "jwtToken": access_token,
        }

    def login(
        request: Login,
        db: Session = Depends(getDatabase),
    ):
        if not request.email and not request.phone:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=f"Either email or phone must be provided"
            )
        user = db.query(UserModel).filter(UserModel.email == request.email).first() if request.email else db.query(UserModel).filter(UserModel.phone == request.phone).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )
        if not verify(user.password, request.password):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Incorrect password"
            )

        access_token = createAccessToken(data={"sub": user.email})
        user.password = "hashed"
        response = {
            "user": user,
            "jwtToken": access_token,
        }
        return response

    def deleteUser(userId: int, db: Session, current_user: UserModel = Depends(verifyToken)):
        dbUserId = db.query(UserModel).filter(UserModel.id == userId).first()
        if not dbUserId:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
            )
        if (dbUserId.role == UserRole.LEADERGATHERING or dbUserId.role == UserRole.LEADERTRANSACTION) and current_user.role != UserRole.CEO:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Only CEO can delete leader!"
            )
        if (dbUserId.role == UserRole.STAFFGATHERING or dbUserId.role == UserRole.STAFFTRANSACTION) and (current_user.role == UserRole.STAFFTRANSACTION or current_user.role == UserRole.STAFFGATHERING):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Only CEO, leader can delete staff!"
            )
        db.delete(dbUserId)
        db.commit()
        return {"detail": "Deleted"}