from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from models.wardModel import WardModel
from models.warehouseModel import WarehouseModel
from models.trackingModel import SendType, TrackingModel
from controllers.userController import verifyToken
from database import getDatabase
from datetime import datetime
from models.transactionModel import TransactionModel, TransactionType, TransactionStatus
from models.transactionDetailModel import TransactionDetailModel
from models.transportationChargeModel import TransportationChargeModel
from models.userModel import UserModel
# from models.customerLocationModel import CustomerLocationModel
from schemas.transactionSchema import CreateTransaction, CreateTransactionDetail, UpdateTransaction
from schemas.trackingSchema import CreateTracking, UpdateTracking
from controllers.trackingController import TrackingController
from controllers.customerController import CustomerController
import random

from models.customerModel import CustomerModel

class TransactionController:
    def getAllTransaction(db: Session = Depends(getDatabase)):
        return db.query(TransactionModel).all()
    
    def createTransaction(transaction: CreateTransaction, detail: CreateTransactionDetail, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        
        sender = CustomerController.createCustomer(transaction.sender_info, db=db)
        receiver = CustomerController.createCustomer(transaction.receiver_info, db=db)
        
        transactionCode = "MP" + "".join([str(random.randint(1, 100)) for _ in range(6)])
        db_transaction = TransactionModel(
            user_id=current_user.id,
            code=transactionCode,
            sender_id=sender.id,
            receiver_id=receiver.id,
            transaction_send_date=transaction.transaction_send_date,
            transaction_receive_date=transaction.transaction_receive_date,
            transaction_type=TransactionType.DELIVER,
            status=TransactionStatus.RECEIVED,
        )
        
        db.add(db_transaction)
        db.commit()        
        db.refresh(db_transaction)

        transaction_id = db_transaction.id

        db_detail = TransactionDetailModel(
            transaction_id=transaction_id,
            item_type=detail.item_type,
            item_description=detail.item_description,
            item_quantity=detail.item_quantity,
            item_weight=detail.item_weight,
            item_value=detail.item_value,
            item_attached=detail.item_attached,
            item_return=detail.item_return,
            cod=detail.cod,
            other_revenue=detail.other_revenue
        )
        db.add(db_detail)
        db.commit()
        db.refresh(db_detail)

        transportation_charge_base = 9000
        transportation_charge_surcharge = 1900
        transportation_charge_vat = 0
        transportation_charge_other = 0
        db_transportation_charge = TransportationChargeModel(
            transaction_id=transaction_id,
            base=transportation_charge_base,
            surcharge=transportation_charge_surcharge,
            vat=transportation_charge_vat,
            other=transportation_charge_other
        )
        db.add(db_transportation_charge)
        db.commit()
        db.refresh(db_transportation_charge)
        sender = CustomerController.createCustomer(transaction.sender_info, db=db)
        receiver = CustomerController.createCustomer(transaction.receiver_info, db=db)
        
        # sender_location = db.query(CustomerLocationModel).filter(CustomerLocationModel.customer_id==sender.id, CustomerLocationModel.location_id==transaction.sender_info.location_id).first()
        warehouse = db.query(WarehouseModel).filter(WarehouseModel.location_id==transaction.sender_info.location_id).first()
        staff = db.query(UserModel).filter(UserModel.warehouses_id==warehouse.id).first()
        if not staff:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Not exist staff"
            )
        tracking = CreateTracking(
            date=datetime.now(),
            user_send=sender.id,
            user_receive=staff.id,
            send_location_id=sender.location_id,
            receive_location_id=sender.location_id,
            send_type=SendType.FORWARD
        )
        
        TrackingController.createTracking(transaction_id=transaction_id, tracking=tracking, db=db)
        
        return db_transaction
    
    # TODO:
    #     1. Caculate total cod.
    #     2. Join customer_locations table to get value.
    #     3. Reduce queries as few as possible.
    
    def create_forward_sending(transaction_id: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        transaction = db.query(TransactionModel).filter(TransactionModel.id==transaction_id).first()
        transaction.status = TransactionStatus.SENDING
        warehouse = db.query(WarehouseModel).filter(WarehouseModel.id==current_user.warehouses_id).first()
        ward = db.query(WardModel).filter(WardModel.id==warehouse.location_id).first()
        gather_ward = db.query(WardModel).filter(WardModel.district_id==ward.district_id).first()
        
        tracking = CreateTracking(
            date=datetime.now(),
            user_send=current_user.id,
            send_location_id=warehouse.location_id,
            receive_location_id=gather_ward.id,
            send_type=SendType.FORWARD
        )
        db_tracking = TrackingController.createTracking(transaction_id=transaction_id, tracking=tracking, db=db)
        return db_tracking

    def create_backward_sending(transaction_id: int, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        transaction = db.query(TransactionModel).filter(TransactionModel.id==transaction_id).first()
        transaction.status = TransactionStatus.SENDING
        warehouse = db.query(WarehouseModel).filter(WarehouseModel.id==current_user.warehouses_id).first()

        tracking = CreateTracking(
            date=datetime.now(),
            user_send=current_user.id,
            user_receive=transaction.receiver_id,
            send_location_id=warehouse.location_id,
            receive_location_id=warehouse.location_id,
            send_type=SendType.BACKWARD
        )
        db_tracking = TrackingController.createTracking(transaction_id=transaction_id, tracking=tracking, db=db)
        return db_tracking
    
    def getTransactionById(transaction_id: int, db: Session=Depends(getDatabase)):
        transaction = db.query(TransactionModel).filter(TransactionModel.id==transaction_id).first()
        user = db.query(UserModel).filter(UserModel.id==transaction.user_id).first()
        sender = db.query(CustomerModel).filter(CustomerModel.id==transaction.sender_id).first()
        receiver = db.query(CustomerModel).filter(CustomerModel.id==transaction.receiver_id).first()
        transaction_detail = db.query(TransactionDetailModel).filter(TransactionDetailModel.transaction_id==transaction.id).first()
        transportation_charge = db.query(TransportationChargeModel).filter(TransportationChargeModel.transaction_id==transaction.id).first()
        total_transportation_charge = transportation_charge.calculate_sum()
        return {
            "id": transaction.id,
            "user": user,
            "code": transaction.code,
            "sender": sender,
            "receiver": receiver,
            "detail": transaction_detail,
            "charge": {
                "detail": transportation_charge,
                "total": total_transportation_charge,  
            }
        }
    
    def confirm(
        transaction_id: int,
        status: TransactionStatus,
        db: Session = Depends(getDatabase),
    ):
        transaction = (
            db.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
        )

        if not transaction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Not exist"
            )
        
        transaction.status = status
        db.commit()
        db.refresh(transaction)
        return transaction
    
    def get_quantity(db: Session=Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        # trackings = db.query(TrackingModel).filter(TrackingModel.receive_location_id==location_id).all()
        warehouse = db.query(WarehouseModel).filter(WarehouseModel.id == current_user.warehouses_id).first()
        customers = db.query(CustomerModel).filter(CustomerModel.location_id == warehouse.location_id).all()
        
        successes = 0
        not_successes = 0
        for customer in customers:
            success = db.query(TransactionModel).filter(TransactionModel.status == TransactionStatus.SHIPPED, TransactionModel.receiver_id==customer.id).all()
            if success is not None: 
                successes += len(success)
    
            not_success = db.query(TransactionModel).filter(TransactionModel.status == TransactionStatus.RETURN, TransactionModel.receiver_id==customer.id).all()
            if not_success is not None:
                not_successes += len(not_success)
        return {
            "success": successes,
            "not_success": not_successes
            }
