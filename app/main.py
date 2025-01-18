from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.core.config import settings

from app.resources.descriptions.routes import router as descriptions_router
from app.resources.messages.routes import router as messages_router

import logging

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

Base.metadata.create_all(bind=engine)

app.include_router(descriptions_router, prefix="/descriptions", tags=["Descriptions"])
app.include_router(messages_router, prefix="/messages", tags=["Messages"])
