from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from schemas.transactionSchema import UpdateTransaction
from controllers.transactionController import TransactionController
from database import getDatabase
from controllers.userController import UserController, verifyToken
from schemas.userSchema import RegisterUser, Login
from models.userModel import UserModel, UserRole

router = APIRouter(
    tags=["Staff Gathering"],
    responses={404: {"description": "Not found"}},
)

@router.put("/confirm/{transaction_id}")
def confirm_received(transaction_id: int, db: Session = Depends(getDatabase)):
    return TransactionController.confirm_received(transaction_id=transaction_id, db=db)

@router.put("/sending/{transaction_id}")
def sending(transaction_id: int, db: Session = Depends(getDatabase)):
    return TransactionController.sending(transaction_id=transaction_id, db=db)
