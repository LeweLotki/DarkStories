# app/resources/descriptions/routes.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.resources.descriptions import crud, schemas
from app.core.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.DescriptionDetailResponse)
def create_description(
    description: schemas.DescriptionCreate,
    db: Session = Depends(get_db)
):
    return crud.create_description(db=db, description=description)

@router.get("/random", response_model=schemas.DescriptionResponse)
def get_random_description(db: Session = Depends(get_db)):
    description = crud.get_random_description(db)
    if not description:
        raise HTTPException(status_code=404, detail="No descriptions found")
    return description

@router.get("/{id}", response_model=schemas.DescriptionDetailResponse)
def get_description_by_id(
    id: int,
    db: Session = Depends(get_db)
):
    description = crud.get_description_by_id(db, description_id=id)
    if not description:
        raise HTTPException(status_code=404, detail="Description not found")
    return description
