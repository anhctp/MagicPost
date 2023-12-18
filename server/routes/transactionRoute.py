from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers.userController import verifyToken
from database import getDatabase
from controllers.transactionController import TransactionController
from models.userModel import UserModel
from schemas.transactionSchema import CreateTransaction, CreateTransactionDetail

router = APIRouter(
    tags=["Transactions"],
    prefix="/transaction",
    responses={404: {"description": "Not found"}},
)

@router.get("/")
def get_all_transactions(db: Session = Depends(getDatabase)):
    return TransactionController.getAllTransaction(db=db)

@router.post("/")
def create_full_transaction(transaction: CreateTransaction, detail: CreateTransactionDetail, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return TransactionController.createTransaction(transaction=transaction, detail=detail, db=db, current_user=current_user)