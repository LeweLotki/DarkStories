# app/resources/messages/routes.py

from fastapi import APIRouter, Query
import random

router = APIRouter()

@router.get("/", response_model=str)
def get_message(
    message: str = Query(..., description="The message sent by the user"),
    id: int = Query(..., description="A numeric ID associated with the request")
):
    """
    Endpoint to receive a message and an ID, and return a random response from {YES, NO, PASS}.
    """
    responses = ["YES", "NO", "PASS"]
    return random.choice(responses)

