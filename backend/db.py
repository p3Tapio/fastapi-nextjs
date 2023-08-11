from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import env_variables

ENV = env_variables["environment"]

if ENV == "test":
    DB_URL = "sqlite:///./app.test.db"
else:
    DB_URL = "sqlite:///./app.db"

engine = create_engine(DB_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
