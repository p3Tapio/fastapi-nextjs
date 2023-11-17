from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import env_variables

DB_URL = env_variables["db_url"]

if "sqlite" in DB_URL:
    engine = create_engine(DB_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
