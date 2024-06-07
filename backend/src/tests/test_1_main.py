from src.tests.utils import client
import sqlite3

print("SQLITE: " + sqlite3.sqlite_version)


# TOOD -- clear db after tests


def test_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, I'm alive!"}
