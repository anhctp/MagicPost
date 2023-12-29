from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database import getDatabase
from controllers.userController import verifyToken
from models.locationModel import LocationModel
from models.userModel import UserModel, UserRole
from models.transactionModel import TransactionModel, TransactionStatus
from schemas.trackingSchema import CreateTracking
from datetime import datetime
from models.warehouseModel import TypeWarehouse, WarehouseModel
from models.customerModel import CustomerModel
from models.wardModel import WardModel
from models.trackingModel import SendType, TrackingModel
from controllers.trackingController import TrackingController


class GatheringController:
    def create_gg_sending(
        transaction_id: int,
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        transaction = (
            db.query(TransactionModel)
            .filter(TransactionModel.id == transaction_id)
            .first()
        )
        transaction.status = TransactionStatus.SENDING
        warehouse = (
            db.query(WarehouseModel)
            .filter(WarehouseModel.id == current_user.warehouses_id)
            .first()
        )
        receiver = (
            db.query(CustomerModel)
            .filter(CustomerModel.id == transaction.receiver_id)
            .first()
        )
        gathering_location = (
            db.query(WarehouseModel)
            .filter(
                WarehouseModel.location_id == receiver.location_id,
                WarehouseModel.type == TypeWarehouse.GATHERING,
            )
            .first()
        )

        tracking = CreateTracking(
            date=datetime.now(),
            user_send=current_user.id,
            send_location_id=warehouse.id,
            receive_location_id=gathering_location.id,
            send_type=SendType.GG,
        )
        db_tracking = TrackingController.createTracking(
            transaction_id=transaction_id, tracking=tracking, db=db
        )
        return db_tracking

    def create_backward_sending(
        transaction_id: int,
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        transaction = (
            db.query(TransactionModel)
            .filter(TransactionModel.id == transaction_id)
            .first()
        )
        transaction.status = TransactionStatus.SENDING

        warehouse = (
            db.query(WarehouseModel)
            .filter(WarehouseModel.id == current_user.warehouses_id)
            .first()
        )
        receiver = (
            db.query(CustomerModel)
            .filter(CustomerModel.id == transaction.receiver_id)
            .first()
        )

        tracking = CreateTracking(
            date=datetime.now(),
            user_send=current_user.id,
            send_location_id=warehouse.location_id,
            receive_location_id=receiver.location_id,
            send_type=SendType.BACKWARD,
        )
        db_tracking = TrackingController.createTracking(
            transaction_id=transaction_id, tracking=tracking, db=db
        )
        return db_tracking

    def confirm(
        transaction_id: int,
        status: TransactionStatus,
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        transaction = (
            db.query(TransactionModel)
            .filter(TransactionModel.id == transaction_id)
            .first()
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

    def get_type_quantity(
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
        warehouse_id=None,
    ):
        if (
            current_user.role != UserRole.LEADERGATHERING
            and current_user.role != UserRole.CEO
        ):
            return {"Not Authorized"}
        receive_from_gatherings = []
        receives_from_transactions = []
        send_to_transactions = []
        send_to_gatherings = []

        if warehouse_id == None:
            warehouse = (
                db.query(WarehouseModel)
                .filter(WarehouseModel.id == current_user.warehouses_id)
                .first()
            )
        else:
            warehouse = (
                db.query(WarehouseModel)
                .filter(WarehouseModel.id == warehouse_id)
                .first()
            )

        receive_from_gathering_tracks = (
            db.query(TrackingModel)
            .filter(
                TrackingModel.receive_location_id == warehouse.location_id,
                TrackingModel.send_type == SendType.GG,
            )
            .all()
        )
        if receive_from_gathering_tracks is not None:
            for track in receive_from_gathering_tracks:
                transaction = (
                    db.query(TransactionModel)
                    .filter(TransactionModel.id == track.transaction_id)
                    .first()
                )
                if (
                    transaction is not None
                    and transaction not in receive_from_gatherings
                ):
                    receive_from_gatherings.append(transaction)

        receives_from_transaction_tracks = (
            db.query(TrackingModel)
            .filter(
                TrackingModel.receive_location_id == warehouse.location_id,
                TrackingModel.send_type == SendType.FORWARD,
            )
            .all()
        )
        if receives_from_transaction_tracks is not None:
            for track in receives_from_transaction_tracks:
                transaction = (
                    db.query(TransactionModel)
                    .filter(TransactionModel.id == track.transaction_id)
                    .first()
                )
                if (
                    transaction is not None
                    and transaction not in receives_from_transactions
                ):
                    receives_from_transactions.append(transaction)

        send_to_transaction_tracks = (
            db.query(TrackingModel)
            .filter(
                TrackingModel.send_location_id == warehouse.location_id,
                TrackingModel.send_type == SendType.BACKWARD,
            )
            .all()
        )
        if send_to_transaction_tracks is not None:
            for track in send_to_transaction_tracks:
                transaction = (
                    db.query(TransactionModel)
                    .filter(TransactionModel.id == track.transaction_id)
                    .first()
                )
                if transaction is not None and transaction not in send_to_transactions:
                    send_to_transactions.append(transaction)

        send_to_gathering_tracks = (
            db.query(TrackingModel)
            .filter(
                TrackingModel.send_location_id == warehouse.location_id,
                TrackingModel.send_type == SendType.GG,
            )
            .all()
        )
        if send_to_gathering_tracks is not None:
            for track in send_to_gathering_tracks:
                transaction = (
                    db.query(TransactionModel)
                    .filter(TransactionModel.id == track.transaction_id)
                    .first()
                )
                if transaction is not None and transaction not in send_to_gatherings:
                    send_to_gatherings.append(transaction)

        return {
            "receive_from_gatherings": receive_from_gatherings,
            "receives_from_transactions": receives_from_transactions,
            "send_to_gatherings": send_to_gatherings,
            "send_to_transactions": send_to_transactions,
        }

    def gathering_statistic(
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        if (
            current_user.role != UserRole.LEADERGATHERING
            and current_user.role != UserRole.STAFFGATHERING
        ):
            return {"Not Authorized"}
        receive_from_gatherings = []
        receives_from_transactions = []
        send_to_transactions = []
        send_to_gatherings = []

        warehouse = (
            db.query(WarehouseModel)
            .filter(WarehouseModel.id == current_user.warehouses_id)
            .first()
        )

        receive_transactions = (
            db.query(TransactionModel)
            .filter(
                TransactionModel.cur_warehouse_id == current_user.warehouses_id,
                TransactionModel.status == TransactionStatus.RECEIVED,
            )
            .all()
        )

        for transaction in receive_transactions:
            tracking = (
                db.query(TrackingModel)
                .filter(
                    TrackingModel.transaction_id == transaction.id,
                    TrackingModel.receive_location_id == warehouse.location_id,
                )
                .first()
            )
            if tracking.send_type == SendType.GG:
                receive_from_gatherings.append(transaction)
            if tracking.send_type == SendType.FORWARD:
                receives_from_transactions.append(transaction)

        receive_not_confirm = (
            db.query(TransactionModel)
            .filter(
                TransactionModel.status == TransactionStatus.SENDING,
            )
            .all()
        )
        for transaction in receive_not_confirm:
            tracking = (
                db.query(TrackingModel)
                .filter(
                    TrackingModel.transaction_id == transaction.id,
                    TrackingModel.receive_location_id == warehouse.id,
                )
                .first()
            )
            if tracking:
                if tracking.send_type == SendType.FORWARD:
                    receives_from_transactions.append(transaction)

        send_transactions = (
            db.query(TransactionModel)
            .filter(
                TransactionModel.cur_warehouse_id == current_user.warehouses_id,
                TransactionModel.status == TransactionStatus.SENDING,
            )
            .all()
        )
        for transaction in send_transactions:
            print(transaction)
            tracking = (
                db.query(TrackingModel)
                .filter(
                    TrackingModel.transaction_id == transaction.id,
                    TrackingModel.send_location_id == warehouse.location_id,
                )
                .first()
            )
            if tracking.send_type == SendType.GG:
                send_to_gatherings.append(transaction)
            if tracking.send_type == SendType.BACKWARD:
                send_to_transactions.append(transaction)

        return {
            "receive_from_gatherings": receive_from_gatherings,
            "receives_from_transactions": receives_from_transactions,
            "send_to_gatherings": send_to_gatherings,
            "send_to_transactions": send_to_transactions,
        }
