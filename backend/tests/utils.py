from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


email = "valid@email.com"
password = "secret"


def get_correct_user_credentials():
    response = client.post("/user/signin", json={"email": email, "password": password})
    response_json = response.json()

    return {
        "content-type": "application/json;charset=UTF-8",
        "authorization": "bearer " + response_json["accessToken"],
    }


def create_user_with_wrong_credentials():
    response = client.post(
        "/user/register",
        json={
            "username": "bad-user",
            "email": "somebody@else.com",
            "password": "something",
        },
    )
    response_json = response.json()

    return {
        "content-type": "application/json;charset=UTF-8",
        "authorization": "bearer " + response_json["accessToken"],
    }


def get_wrong_user_credentials():
    response = client.post(
        "/user/signin", json={"email": "somebody@else.com", "password": "something"}
    )
    response_json = response.json()

    print(response_json)

    return {
        "content-type": "application/json;charset=UTF-8",
        "authorization": "bearer " + response_json["accessToken"],
    }


def get_original_post():
    headers = get_correct_user_credentials()
    original_post = client.get("/post/", headers=headers)
    original_post_json = original_post.json()
    return original_post_json
