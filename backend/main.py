from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users.router import user_router
from db import engine, Base
from config import origins

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

app.include_router(user_router)


@app.get("/")
async def root():
    return {"message": "Hello"}