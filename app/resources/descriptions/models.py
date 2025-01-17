# app/resources/descriptions/models.py

from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Description(Base):
    __tablename__ = "descriptions"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    solution = Column(String, nullable=False)

