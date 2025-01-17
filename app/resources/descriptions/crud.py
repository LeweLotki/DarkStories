# app/resources/descriptions/crud.py

import random
from sqlalchemy.orm import Session
from app.resources.descriptions import models

def get_random_description(db: Session):
    descriptions = db.query(models.Description).all()
    if not descriptions:
        return None
    return random.choice(descriptions)

