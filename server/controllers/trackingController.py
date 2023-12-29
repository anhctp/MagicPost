from fastapi import Depends
from sqlalchemy.orm import Session
from database import getDatabase
from models.trackingModel import TrackingModel
from schemas.trackingSchema import CreateTracking
from models.wardModel import WardModel
from models.transactionModel import TransactionModel, TransactionStatus

class TrackingController:
    def getAllTracking(db: Session = Depends(getDatabase)):
        return db.query(TrackingModel).all()
    
    def createTracking(transaction_id: int, tracking: CreateTracking, db: Session = Depends(getDatabase)):
        db_tracking = TrackingModel(
            transaction_id=transaction_id,
            date=tracking.date,
            user_send=tracking.user_send,
            user_receive=tracking.user_receive,
            send_location_id= tracking.send_location_id,
            receive_location_id= tracking.receive_location_id,
            send_type= tracking.send_type
        )
        db.add(db_tracking)
        db.commit()
        db.refresh(db_tracking)
        return db_tracking
    
    def getTrackingByTransactionId(transaction_id: int, db: Session = Depends(getDatabase)):
        trackings = db.query(TrackingModel).filter(TrackingModel.transaction_id == transaction_id).all()
        messages = []
        transaction = db.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
        if trackings is not None:
            for i, tracking in enumerate(trackings):
                ward = db.query(WardModel).filter(WardModel.id == tracking.receive_location_id).first()
                if i==0:
                    msg = "Tiếp nhận hàng tại điểm giao dịch " + ward.name
                if i==1:
                    msg = "Đang được chuyển đến điểm tập kết " + ward.name
                if i==2:
                    msg = "Đã tới điểm tập kết" 
                    messages.append(msg)
                    msg = "Đang được chuyển đến điểm tập kết " + ward.name
                if i==3:
                    msg = "Đã tới điểm tập kết" 
                    messages.append(msg)
                    msg = "Đang được chuyển đến điểm giao dịch " + ward.name
                if i==4:
                    msg = "Đã tới điểm giao dịch"
                    messages.append(msg)
                    msg = "Nhân viên giao hàng đang tiến hành giao tới " + ward.name
                messages.append(msg)
        
        if(transaction.status == TransactionStatus.SHIPPED):
            msg = "Đơn hàng đã giao thành công"
            messages.append(msg)
        return messages

        # for tracking in trackings:
            # ward = db.query(WardModel).filter(WardModel.id == tracking.receive_location_id).first()
            # if tracking.send_location_id == tracking.receive_location_id and tracking.send_type=='FORWARD':
            #     msg = "Tiếp nhận hàng tại điểm giao dịch " + ward.name
            # elif tracking.send_type=='FORWARD' or tracking.send_type=='GG':
            #     msg = "Giao hàng tới điểm tập kết " + ward.name 
            

