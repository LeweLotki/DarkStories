# app/resources/descriptions/routes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.resources.descriptions import crud, schemas
from app.core.database import get_db

router = APIRouter()

@router.get("/random", response_model=schemas.DescriptionResponse)
def get_random_description(db: Session = Depends(get_db)):
    description = crud.get_random_description(db)
    if not description:
        raise HTTPException(status_code=404, detail="No descriptions found")
    return description

