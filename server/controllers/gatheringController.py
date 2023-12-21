from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.userController import verifyToken
from models.userModel import UserModel, UserRole
from models.transactionModel import TransactionModel, TransactionStatus
from schemas.trackingSchema import CreateTracking
from datetime import datetime
from models.warehouseModel import WarehouseModel
from models.customerModel import CustomerModel
from models.wardModel import WardModel
from models.trackingModel import SendType, TrackingModel
from controllers.trackingController import TrackingController


class GatheringController:
    def create_forward_sending(transaction_id: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        transaction = db.query(TransactionModel).filter(TransactionModel.id==transaction_id).first()
        transaction.status = TransactionStatus.SENDING
        warehouse = db.query(WarehouseModel).filter(WarehouseModel.id==current_user.warehouses_id).first()
        receiver = db.query(CustomerModel).filter(CustomerModel.id == transaction.receiver_id).first()
        ward_id = receiver.location_id
        ward = db.query(WardModel).filter(WardModel.id == ward_id).first()
        gathering_location = db.query(WardModel).filter(WardModel.district_id == ward.district_id).first()

        tracking = CreateTracking(
            date=datetime.now(),
            user_send=current_user.id,
            send_location_id=warehouse.location_id,
            receive_location_id=gathering_location.id,
            send_type=SendType.GG
        )
        db_tracking = TrackingController.createTracking(transaction_id=transaction_id, tracking=tracking, db=db)
        return db_tracking
    
    def create_backward_sending(transaction_id: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        transaction = db.query(TransactionModel).filter(TransactionModel.id==transaction_id).first()
        transaction.status = TransactionStatus.SENDING

        warehouse = db.query(WarehouseModel).filter(WarehouseModel.id==current_user.warehouses_id).first()
        receiver = db.query(CustomerModel).filter(CustomerModel.id == transaction.receiver_id).first()

        tracking = CreateTracking(
            date=datetime.now(),
            user_send=current_user.id,
            send_location_id=warehouse.location_id,
            receive_location_id=receiver.location_id,
            send_type=SendType.BACKWARD
        )
        db_tracking = TrackingController.createTracking(transaction_id=transaction_id, tracking=tracking, db=db)
        return db_tracking
    
    def get_type_quantity(db: Session=Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        if (current_user.role != UserRole.LEADERGATHERING):
            return {"Not Authorized"}
        
        staff = db.query(UserModel).filter(UserModel.warehouses_id == current_user.warehouses_id, UserModel.role == UserRole.STAFFGATHERING).first()

        forwards = db.query(TrackingModel).filter(TrackingModel.user_send == staff.id, TrackingModel.send_type==SendType.FORWARD).all()
        backwards = db.query(TrackingModel).filter(TrackingModel.user_send == staff.id, TrackingModel.send_type==SendType.BACKWARD).all()
        return {
            "forward": len(forwards),
            "backward": len(backwards)
            }
    
    def confirm(
        transaction_id: int,
        status: TransactionStatus,
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken)
    ):
        transaction = (
            db.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
        )

        if not transaction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Not exist"
            )
        
        transaction.status = status
        if status == TransactionStatus.RECEIVED:
            transaction.cur_warehouse_id = current_user.warehouses_id
        db.commit()
        db.refresh(transaction)
        return transaction
    
    def gathering_statistic(db: Session=Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        # if (current_user.role != UserRole.LEADERTRANSACTION):
        #     return {"Not Authorized"}
        receive_from_gatherings = []
        receives_from_transactions = []
        send_to_transactions = []
        send_to_gatherings = []

        warehouse = db.query(WarehouseModel).filter(WarehouseModel.id == current_user.warehouses_id).first()
        
        receive_transactions = db.query(TransactionModel).filter(TransactionModel.cur_warehouse_id == current_user.warehouses_id, TransactionModel.status == TransactionStatus.RECEIVED).all()
        for transaction in receive_transactions:
            tracking = db.query(TrackingModel).filter(TrackingModel.transaction_id == transaction.id, TrackingModel.receive_location_id==warehouse.location_id).first()
            if(tracking.send_type == SendType.GG):
                receive_from_gatherings.append(transaction)
            if(tracking.send_type == SendType.FORWARD):
                receives_from_transactions.append(transaction)
        send_transactions =  db.query(TransactionModel).filter(TransactionModel.cur_warehouse_id == current_user.warehouses_id, TransactionModel.status == TransactionStatus.SENDING).all()
        for transaction in send_transactions:
            tracking = db.query(TrackingModel).filter(TrackingModel.transaction_id == transaction.id, TrackingModel.send_location_id==warehouse.location_id).first()
            if(tracking.send_type == SendType.GG):
                send_to_gatherings.append(transaction)
            if(tracking.send_type == SendType.BACKWARD):
                send_to_transactions.append(transaction)

        return {
            "receive_from_gatherings": receive_from_gatherings,
            "receives_from_transactions": receives_from_transactions,
            "send_to_gatherings": send_to_gatherings,
            "send_to_transactions": send_to_transactions,
        }
