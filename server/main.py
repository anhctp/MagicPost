from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import (
    userRoute,
    locationRoute,
    warehouseRoute,
    transactionRoute,
    gatheringRoute,
    manageRoute,
    districtRoute,
    divisionRoute,
    wardRoute,
    trackingRoute
)

Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(userRoute.router, prefix="/api")
app.include_router(locationRoute.router, prefix="/api")
app.include_router(warehouseRoute.router, prefix="/api")
app.include_router(transactionRoute.router, prefix="/api")
app.include_router(gatheringRoute.router, prefix="/api")
app.include_router(manageRoute.router, prefix="/api")
app.include_router(districtRoute.router, prefix="/api")
app.include_router(divisionRoute.router, prefix="/api")
app.include_router(wardRoute.router, prefix="/api")
app.include_router(trackingRoute.router, prefix="/api")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://magic-post-ctpanh.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "sentry-trace", "baggage"],
)


@app.get("/api/ping")
def ping():
    return "pong"
