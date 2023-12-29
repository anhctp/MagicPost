from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.locationModel import LocationModel
from models.wardModel import WardModel
from models.warehouseModel import TypeWarehouse, WarehouseModel
from models.trackingModel import SendType, TrackingModel
from controllers.userController import verifyToken
from database import getDatabase
from datetime import datetime
from models.transactionModel import TransactionModel, TransactionType, TransactionStatus
from models.transactionDetailModel import TransactionDetailModel
from models.transportationChargeModel import TransportationChargeModel
from models.userModel import UserModel, UserRole
from schemas.transactionSchema import CreateTransaction, CreateTransactionDetail
from schemas.trackingSchema import CreateTracking
from controllers.trackingController import TrackingController
from controllers.customerController import CustomerController
import random
from models.customerModel import CustomerModel
from controllers.gatheringController import GatheringController
from models.districtModel import DistrictModel


class TransactionController:
    def createTransaction(
        transaction: CreateTransaction,
        detail: CreateTransactionDetail,
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        sender = CustomerController.createCustomer(transaction.sender_info, db=db)
        receiver = CustomerController.createCustomer(transaction.receiver_info, db=db)
        transactionCode = "MP" + "".join(
            [str(random.randint(1, 100)) for _ in range(6)]
        )
        db_transaction = TransactionModel(
            user_id=current_user.id,
            code=transactionCode,
            sender_id=sender.id,
            receiver_id=receiver.id,
            cur_warehouse_id=current_user.warehouses_id,
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
            other_revenue=detail.other_revenue,
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
            other=transportation_charge_other,
        )
        db.add(db_transportation_charge)
        db.commit()
        db.refresh(db_transportation_charge)
        sender = CustomerController.createCustomer(transaction.sender_info, db=db)
        receiver = CustomerController.createCustomer(transaction.receiver_info, db=db)

        warehouse = (
            db.query(WarehouseModel)
            .filter(WarehouseModel.location_id == transaction.sender_info.location_id)
            .first()
        )
        staff = (
            db.query(UserModel).filter(UserModel.warehouses_id == warehouse.id).first()
        )
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
            send_type=SendType.FORWARD,
        )
        TrackingController.createTracking(
            transaction_id=transaction_id, tracking=tracking, db=db
        )

        return transaction_id

    def cal_total_cost(
        send_location_id,
        receive_location_id,
        item_weight,
        db: Session = Depends(getDatabase),
        in_division_base_charge=5000,
        out_division_base_charge=8000,
        surchage_rate=0.2,
    ):
        send_ward = db.query(WardModel).filter(WardModel.id == send_location_id).first()
        send_district = (
            db.query(DistrictModel)
            .filter(DistrictModel.id == send_ward.district_id)
            .first()
        )

        receive_ward = (
            db.query(WardModel).filter(WardModel.id == receive_location_id).first()
        )
        receive_district = (
            db.query(DistrictModel)
            .filter(DistrictModel.id == receive_ward.district_id)
            .first()
        )
        base_charge = 0
        if send_district.division_id == receive_district.division_id:
            base_charge = in_division_base_charge
        else:
            base_charge = out_division_base_charge
        surchage = base_charge * surchage_rate
        total = base_charge * item_weight + surchage
        return total

    # TODO:
    #     1. Caculate total cod.
    #     2. Join customer_locations table to get value.
    #     3. Reduce queries as few as possible.

    def create_forward_sending(
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
        db.commit()

        warehouse = (
            db.query(WarehouseModel)
            .filter(WarehouseModel.id == current_user.warehouses_id)
            .first()
        )
        ward = db.query(WardModel).filter(WardModel.id == warehouse.location_id).first()
        gather_ward = (
            db.query(WardModel)
            .filter(WardModel.district_id == ward.district_id)
            .first()
        )
        # location = (
        #     db.query(LocationModel)
        #     .filter(LocationModel.id == warehouse.location_id)
        #     .first()
        # )
        # gather_location = (
        #     db.query(WarehouseModel)
        #     .filter(
        #         WarehouseModel.location_id == location.id,
        #         WarehouseModel.type == TypeWarehouse.GATHERING,
        #     )
        #     .first()
        # )

        tracking = CreateTracking(
            date=datetime.now(),
            user_send=current_user.id,
            send_location_id=warehouse.location_id,
            # receive_location_id=gather_location.id,
            receive_location_id=gather_ward.id,
            send_type=SendType.FORWARD,
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

        tracking = CreateTracking(
            date=datetime.now(),
            user_send=current_user.id,
            user_receive=transaction.receiver_id,
            send_location_id=warehouse.location_id,
            receive_location_id=warehouse.location_id,
            send_type=SendType.BACKWARD,
        )
        db_tracking = TrackingController.createTracking(
            transaction_id=transaction_id, tracking=tracking, db=db
        )
        return db_tracking

    def getTransactionById(
        transaction_id: int,
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        transaction = (
            db.query(TransactionModel)
            .filter(
                TransactionModel.id == transaction_id,
            )
            .first()
        )
        user = db.query(UserModel).filter(UserModel.id == transaction.user_id).first()
        sender = (
            db.query(CustomerModel)
            .filter(CustomerModel.id == transaction.sender_id)
            .first()
        )
        receiver = (
            db.query(CustomerModel)
            .filter(CustomerModel.id == transaction.receiver_id)
            .first()
        )
        transaction_detail = (
            db.query(TransactionDetailModel)
            .filter(TransactionDetailModel.transaction_id == transaction.id)
            .first()
        )
        transportation_charge = (
            db.query(TransportationChargeModel)
            .filter(TransportationChargeModel.transaction_id == transaction.id)
            .first()
        )
        total_transportation_charge = transportation_charge.calculate_sum()

        return {
            "id": transaction.id,
            "user": user,
            "code": transaction.code,
            "status": transaction.status,
            "sender": sender,
            "receiver": receiver,
            "detail": transaction_detail,
            "charge": {
                "detail": transportation_charge,
                "total": total_transportation_charge,
            },
        }

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

    def get_status_quantity(
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        warehouse = (
            db.query(WarehouseModel)
            .filter(WarehouseModel.id == current_user.warehouses_id)
            .first()
        )
        customers = (
            db.query(CustomerModel)
            .filter(CustomerModel.location_id == warehouse.location_id)
            .all()
        )

        successes = 0
        not_successes = 0
        for customer in customers:
            success = (
                db.query(TransactionModel)
                .filter(
                    TransactionModel.status == TransactionStatus.SHIPPED,
                    TransactionModel.receiver_id == customer.id,
                )
                .all()
            )
            if success is not None:
                successes += len(success)

            not_success = (
                db.query(TransactionModel)
                .filter(
                    TransactionModel.status == TransactionStatus.RETURN,
                    TransactionModel.receiver_id == customer.id,
                )
                .all()
            )
            if not_success is not None:
                not_successes += len(not_success)
        return {"success": successes, "not_success": not_successes}

    def get_type_quantity(
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
        warehouse_id=None,
    ):
        if (
            current_user.role != UserRole.LEADERTRANSACTION
            and current_user.role != UserRole.CEO
        ):
            return {"Not Authorized"}

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

        send_to_gatherings = []
        send_to_customers = []
        receive_from_gatherings = []
        receives_from_customers = []

        send_to_gathering_tracks = (
            db.query(TrackingModel)
            .filter(
                TrackingModel.send_location_id == warehouse.location_id,
                TrackingModel.send_type == SendType.FORWARD,
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

        send_to_customers_track = (
            db.query(TrackingModel)
            .filter(
                TrackingModel.send_location_id == warehouse.location_id,
                TrackingModel.send_type == SendType.BACKWARD,
            )
            .all()
        )
        if send_to_customers_track is not None:
            for track in send_to_customers_track:
                transaction = (
                    db.query(TransactionModel)
                    .filter(TransactionModel.id == track.transaction_id)
                    .first()
                )
                if transaction is not None and transaction not in send_to_customers:
                    send_to_customers.append(transaction)

        receives_from_gathering_tracks = (
            db.query(TrackingModel)
            .filter(
                TrackingModel.receive_location_id == warehouse.location_id,
                TrackingModel.send_type == SendType.BACKWARD,
            )
            .all()
        )
        if receives_from_gathering_tracks is not None:
            for track in receives_from_gathering_tracks:
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

        receives_from_customer_tracks = (
            db.query(TrackingModel)
            .filter(
                TrackingModel.receive_location_id == warehouse.location_id,
                TrackingModel.send_type == SendType.FORWARD,
            )
            .all()
        )
        if receives_from_customer_tracks is not None:
            for track in receives_from_customer_tracks:
                transaction = (
                    db.query(TransactionModel)
                    .filter(TransactionModel.id == track.transaction_id)
                    .first()
                )
                if (
                    transaction is not None
                    and transaction not in receives_from_customers
                ):
                    receives_from_customers.append(transaction)

        return {
            "send_to_gatherings": send_to_gatherings,
            "send_to_customers": send_to_customers,
            "receives_from_gatherings": receive_from_gatherings,
            "receives_from_customers": receives_from_customers,
        }

    def transaction_statistic(
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        if (
            current_user.role != UserRole.LEADERTRANSACTION
            and current_user.role != UserRole.STAFFTRANSACTION
        ):
            return {"Not Authorized"}
        receive_from_gatherings = []
        receives_from_customers = []
        send_to_gatherings = []
        send_to_customers = []

        warehouse = (
            db.query(WarehouseModel)
            .filter(WarehouseModel.id == current_user.warehouses_id)
            .first()
        )

        receive_transactions = (
            db.query(TransactionModel)
            .join(
                WarehouseModel, TransactionModel.cur_warehouse_id == WarehouseModel.id
            )
            .filter(
                WarehouseModel.location_id == warehouse.location_id,
            )
            .all()
        )
        for transaction in receive_transactions:
            tracking_array = (
                db.query(TrackingModel)
                .filter(
                    TrackingModel.transaction_id == transaction.id,
                    TrackingModel.receive_location_id == warehouse.location_id,
                )
                .all()
            )
            if tracking_array:
                latest_tracking = max(tracking_array, key=lambda obj: obj.id)
                if (
                    latest_tracking.send_type == SendType.FORWARD
                    and transaction.status == TransactionStatus.RECEIVED
                ):
                    receives_from_customers.append(transaction)
                if (
                    latest_tracking.send_type == SendType.BACKWARD
                ):
                    receive_from_gatherings.append(transaction)

        send_transactions = (
            db.query(TransactionModel)
            .filter(
                TransactionModel.cur_warehouse_id == current_user.warehouses_id,
                TransactionModel.status == TransactionStatus.SENDING,
            )
            .all()
        )
        for transaction in send_transactions:
            tracking_array = (
                db.query(TrackingModel)
                .filter(
                    TrackingModel.transaction_id == transaction.id,
                    TrackingModel.send_location_id == warehouse.location_id,
                )
                .all()
            )
            if tracking_array:
                latest_tracking = max(tracking_array, key=lambda obj: obj.id)
                if latest_tracking.send_type == SendType.FORWARD:
                    send_to_gatherings.append(transaction)
                else:
                    send_to_customers.append(transaction)

        return {
            "receive_from_gatherings": receive_from_gatherings,
            "receives_from_customers": receives_from_customers,
            "send_to_gatherings": send_to_gatherings,
            "send_to_customers": send_to_customers,
        }

    def getAllTransaction(
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        if current_user.role != UserRole.CEO:
            return {"Not Authorized"}

        return db.query(TransactionModel).all()

    def mangage_transaction(
        warehouse_id: int,
        db: Session = Depends(getDatabase),
        current_user: UserModel = Depends(verifyToken),
    ):
        if current_user.role != UserRole.CEO:
            return {"Not Authorized"}

        warehouse = (
            db.query(WarehouseModel).filter(WarehouseModel.id == warehouse_id).first()
        )
        if warehouse.type == TypeWarehouse.TRANSACTION:
            return TransactionController.get_type_quantity(
                db=db, current_user=current_user, warehouse_id=warehouse_id
            )

        if warehouse.type == TypeWarehouse.GATHERING:
            return GatheringController.get_type_quantity(
                db=db, current_user=current_user, warehouse_id=warehouse_id
            )
