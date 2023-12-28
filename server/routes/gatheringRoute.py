from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.userController import verifyToken
from models.userModel import UserModel
from models.transactionModel import TransactionStatus
from controllers.gatheringController import GatheringController

router = APIRouter(
    tags=["Gathering"],
    prefix="/gathering",
    responses={404: {"description": "Not found"}},
)

@router.get("/confirm/{transaction_id}")
def confirm(transaction_id: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return GatheringController.confirm(transaction_id=transaction_id, status=TransactionStatus.RECEIVED, db=db, current_user=current_user)

@router.get("/create_gg_sending/{transaction_id}")
def create_gg_sending(transaction_id: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return GatheringController.create_gg_sending(transaction_id=transaction_id, db=db, current_user=current_user)

@router.get("/create_backward_sending/{transaction_id}")
def create_backward_sending(transaction_id: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return GatheringController.create_backward_sending(transaction_id=transaction_id, db=db, current_user=current_user)

@router.get("/get_type_quantity")
def get_type_quantity(db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return GatheringController.get_type_quantity(db=db, current_user=current_user)

@router.get("/gathering_statistic")
def gathering_statistic(db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
    return GatheringController.gathering_statistic(db=db, current_user=current_user)