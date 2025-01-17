from fastapi import FastAPI

from app.core.database import Base, engine
from app.core.config import settings

from app.resources.descriptions.routes import router as descriptions_router

import logging

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION
)

Base.metadata.create_all(bind=engine)

app.include_router(descriptions_router, prefix="/descriptions", tags=["Descriptions"])
