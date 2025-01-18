# app/resources/messages/crud.py

from sqlalchemy.orm import Session
from app.resources.descriptions.models import Description

def get_description_and_solution_by_id(db: Session, description_id: int):
    """
    Fetch the description and solution of a dark story by its ID.
    """
    description_entry = db.query(Description).filter(Description.id == description_id).first()
    if not description_entry:
        return None
    return {
        "description": description_entry.description,
        "solution": description_entry.solution
    }

