# app/resources/descriptions/crud.py

import random
from sqlalchemy.orm import Session
from app.resources.descriptions import models, schemas

def create_description(db: Session, description: schemas.DescriptionCreate):
    new_description = models.Description(
        description=description.description,
        solution=description.solution,
    )
    db.add(new_description)
    db.commit()
    db.refresh(new_description)
    return new_description

def get_random_description(db: Session):
    descriptions = db.query(models.Description).all()
    if not descriptions:
        return None
    return random.choice(descriptions)

def get_description_by_id(db: Session, description_id: int):
    return db.query(models.Description).filter(models.Description.id == description_id).first()
