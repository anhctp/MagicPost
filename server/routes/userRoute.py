from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.userController import UserController, verifyToken
from schemas.userSchema import RegisterUser, Login
from models.userModel import UserModel

router = APIRouter(
    tags=["Users"],
    responses={404: {"description": "Not found"}},
)


@router.post("/login")
def login(
    request: Login,
    db: Session = Depends(getDatabase),
):
    return UserController.login(request=request, db=db)


@router.post("/register")
def register(user: RegisterUser, db: Session = Depends(getDatabase)):
    return UserController.createUser(user=user, db=db)


@router.get("/me")
def get_me(current_user: UserModel = Depends(verifyToken)):
    return current_user


@router.get("/user/all")
def get_all_user(db: Session = Depends(getDatabase)):
    return UserController.getAllUser(db=db)


@router.get("/user/{userId}")
def get_user_by_id(userId: int, db: Session = Depends(getDatabase)):
    return UserController.getUserById(userId=userId, db=db)


@router.delete("/user/delete/{userId}")
def delete_user(
    userId: int, db: Session = Depends(getDatabase)
):
    return UserController.deleteUser(userId=userId, db=db)