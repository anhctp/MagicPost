from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from controllers.userController import verifyToken
from database import getDatabase
from datetime import datetime
from models.transactionModel import TransactionModel, TransactionType, TransactionStatus
from models.transactionDetailModel import TransactionDetailModel
from models.transportationChargeModel import TransportationChargeModel
from models.userModel import UserModel
from models.customerLocationModel import CustomerLocationModel
from schemas.transactionSchema import CreateTransaction, CreateTransactionDetail
from schemas.trackingSchema import CreateTracking
from controllers.trackingController import TrackingController
from controllers.customerController import CustomerController
import random

class TransactionController:
    def getAllTransaction(db: Session = Depends(getDatabase)):
        return db.query(TransactionModel).all()
    
    def createTransaction(transaction: CreateTransaction, detail: CreateTransactionDetail, db: Session = Depends(getDatabase), current_user: UserModel = Depends(verifyToken)):
        sender = CustomerController.createCustomer(transaction.sender_info, db=db)
        sender_location = db.query(CustomerLocationModel).filter(CustomerLocationModel.customer_id==sender.id, CustomerLocationModel.location_id==transaction.sender_info.location_id).first()
        if not sender_location:
            sender_location = CustomerLocationModel(
                customer_id=sender.id,
                location_id=transaction.sender_info.location_id
            )
            db.add(sender_location)
            db.commit()
            db.refresh(sender_location)

        receiver = CustomerController.createCustomer(transaction.receiver_info, db=db)
        receiver_location = db.query(CustomerLocationModel).filter(CustomerLocationModel.customer_id==receiver.id, CustomerLocationModel.location_id==transaction.receiver_info.location_id).first()
        if not receiver_location:
            receiver_location = CustomerLocationModel(
                customer_id=receiver.id,
                location_id=transaction.receiver_info.location_id
            )
            db.add(receiver_location)
            db.commit()
            db.refresh(receiver_location)

        transactionCode = "MP" + "".join([str(random.randint(1, 100)) for _ in range(6)])
        db_transaction = TransactionModel(
            user_id=current_user.id,
            code=transactionCode,
            sender_location_id=sender_location.id,
            receiver_location_id=receiver_location.id,
            transaction_send_date=transaction.transaction_send_date,
            transaction_receive_date=transaction.transaction_receive_date,
            transaction_type=TransactionType.DELIVER,
            status=TransactionStatus.PROCESSING,
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

        tracking = CreateTracking(
            date=datetime.now(),
            user_send=sender.id,
        )
        TrackingController.createTracking(transaction_id=transaction_id, tracking=tracking, db=db)

        return db_transaction
    
    # TODO:
    #     1. Caculate total cod.
    #     2. Join customer_locations table to get value.
    #     3. Reduce queries as few as possible.
    
    def getTransactionById(transaction_id: int, db: Session=Depends(getDatabase)):
        transaction = db.query(TransactionModel).filter(TransactionModel.id==transaction_id).first()
        user = db.query(UserModel).filter(UserModel.id==transaction.user_id).first()
        sender_location = db.query(CustomerLocationModel).filter(CustomerLocationModel.id==transaction.sender_location_id).first()
        receiver_location = db.query(CustomerLocationModel).filter(CustomerLocationModel.id==transaction.receiver_location_id).first()
        transaction_detail = db.query(TransactionDetailModel).filter(TransactionDetailModel.transaction_id==transaction.id).first()
        transportation_charge = db.query(TransportationChargeModel).filter(TransportationChargeModel.transaction_id==transaction.id).first()
        total_transportation_charge = transportation_charge.calculate_sum()
        return {
            "id": transaction.id,
            "user": user,
            "code": transaction.code,
            "sender": sender_location,
            "receiver": receiver_location,
            "detail": transaction_detail,
            "charge": {
                "detail": transportation_charge,
                "total": total_transportation_charge,  
            }
        }
