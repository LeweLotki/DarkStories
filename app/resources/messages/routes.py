# app/resources/messages/routes.py

from fastapi import APIRouter, Query
import random

router = APIRouter()

@router.get("/", response_model=str)
def get_message(message: str = Query(..., description="The message sent by the user")):
    """
    Endpoint to receive a message and return a random response from {YES, NO, PASS}.
    """
    responses = ["YES", "NO", "PASS"]
    random_response = random.choice(responses)
    return random_response

