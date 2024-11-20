from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, APIRouter
from app.auth.router import router as auth_router
from app.patients.router import router as patients
from app.healthposts.router import router as healthposts

from app.database import create_tables

app = FastAPI(
    title="Sistema de Saúde",
    description="API para um sistema de saúde",
    version="0.1.0",
)


create_tables()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_V1_STR = "/api/v1"
router_v1 = APIRouter(prefix=f"{API_V1_STR}")

router_v1.include_router(auth_router, prefix="/auth")
router_v1.include_router(
    patients,
    prefix="/pacientes",
)
router_v1.include_router(healthposts, prefix="/postos-de-saude")

app.include_router(router_v1)
