# MagicPost

## Contributors
- Cao Thị Phương Anh - K66J 21020272: Backend & Frontend
    + Building database
    + Seeding database (Location in Vietnam)
    + User Authorization
    + Function for CEO (Backend): Manage all staff acounts
    + Interface for print bill, transaction staff (Frontend)  
- Nguyễn Thị Thanh Thuỷ - K66J 21020411: Backend
    + Building database
    + Function for CEO
    + Function for leader of Transaction, leader of Gathering Points
    + Function for staff of Transaction, staff of Gathering Points
- Phạm Minh Tâm - K66J 21020391: Frontend
    + Creating figma
    + Interface for homepage
    + Interface for CEO, leader, staff

## Introduction
Delivery management system.
Features:

- Transaction points:
    + Direct transactions with customers.
    + Transactions with the nearest collection points.
- Gathering points:
    Transshipment of goods between transaction points and collection points.

## Flow

## Technology
- Front-end: NextJs
- Back-end: FastAPI
- Database: Mysql

## 🚀  Quickstart
```bash
# clone project
git clone https://github.com/ctpanh/MagicPost.git
cd MagicPost
# Run backend
cd server
pip install -r requirements.txt
uvicorn main:app -reload
# Seed data
Go to http://127.0.0.1:8000/docs#/
Run api /api/location/data to seed data into db
# Run frontend
cd client
yarn install
yarn dev
```

