# app/resources/descriptions/schemas.py

from pydantic import BaseModel

class DescriptionBase(BaseModel):
    description: str
    solution: str

class DescriptionCreate(DescriptionBase):
    pass

class DescriptionResponse(BaseModel):
    id: int
    description: str

    class Config:
        from_attributes = True

