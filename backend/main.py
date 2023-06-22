from fastapi import FastAPI
from users.router import user_router
from db import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router)

@app.get("/")
async def root():
    return {"message": "Hello"}
