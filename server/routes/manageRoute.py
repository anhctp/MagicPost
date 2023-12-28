from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import getDatabase
from models.userModel import UserModel
from controllers.userController import verifyToken
from controllers.transactionController import TransactionController

router = APIRouter(
    tags=["Manage"],
    prefix="/manage",
    responses={404: {"description": "Not found"}},
)

@router.get("/mangage_all")
def getAllTransaction(db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return TransactionController.getAllTransaction(db=db, current_user=current_user)

@router.get("/mangage_transaction/{warehouse_id}")
def mangage_transaction(warehouse_id: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return TransactionController.mangage_transaction(warehouse_id=warehouse_id, db=db, current_user=current_user)
