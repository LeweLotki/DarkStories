from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "DarkStories"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Dark Stories - app integrated with fine-tune gpt to play card game of dark stories"
    DATABASE_URL: str  = "postgresql://admin:123@localhost:5432/dsdb"


    class Config:
        env_file = ".env"

settings = Settings()

