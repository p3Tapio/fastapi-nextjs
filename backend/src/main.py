from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .users.router import user_router
from .posts.router import post_router
from .tests.router import test_router
from .db import engine, Base
from .config import origins, methods, env_variables
import logging

ENV = env_variables["environment"]


def start_it_up():
    app = FastAPI()
    Base.metadata.create_all(bind=engine)
    return app


app = start_it_up()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=methods,
    allow_headers=["*"],
)

app.include_router(user_router)
app.include_router(post_router)

if ENV == "test":
    app.include_router(test_router)


@app.get("/")
async def root():
    return {"message": "Hello, I'm alive!"}


logging.basicConfig(level=logging.INFO, format="%(message)s")
logging.info("------ FastApi ENV: %s 🚀 -----", ENV)
