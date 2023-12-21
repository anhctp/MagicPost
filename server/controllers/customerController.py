from fastapi import Depends
from sqlalchemy.orm import Session
from database import getDatabase
from models.customerModel import CustomerModel
from schemas.customerSchema import CreateCustomer

class CustomerController:
    def getAllCustomer(db: Session = Depends(getDatabase)):
        return db.query(CustomerModel).all()
    
    def createCustomer(customer: CreateCustomer, db: Session = Depends(getDatabase)):
        db_customer = db.query(CustomerModel).filter(CustomerModel.fullname==customer.fullname, CustomerModel.phone==customer.phone).first()
        if not db_customer:
            db_customer = CustomerModel(
                fullname=customer.fullname,
                phone=customer.phone,
                location_id=customer.location_id,
            )
            db.add(db_customer)
            db.commit()
            db.refresh(db_customer)
        return db_customer

    # update if need