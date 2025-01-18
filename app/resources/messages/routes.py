# app/resources/messages/routes.py

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.resources.messages import crud, utils
from app.core.database import get_db

router = APIRouter()

@router.get("/", response_model=str)
def get_message(
    message: str = Query(..., description="The user's question"),
    id: int = Query(..., description="The ID of the dark story"),
    db: Session = Depends(get_db)
):
    """
    Endpoint to receive a user's question and an ID,
    fetch the description and solution of the story,
    and use the fine-tuned GPT model to respond.
    """
    # Fetch the description and solution from the database
    story = crud.get_description_and_solution_by_id(db, description_id=id)
    if not story:
        raise HTTPException(status_code=404, detail="Dark story not found")

    # Get the GPT model response
    response = utils.use_fine_tuned_model(
        description=story["description"],
        solution=story["solution"],
        question=message
    )

    if not response:
        raise HTTPException(status_code=500, detail="Failed to get a response from the fine-tuned model")

    return response

