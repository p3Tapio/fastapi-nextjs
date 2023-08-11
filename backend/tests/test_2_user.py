from utils import client, email, password


def test_create_user():
    response = client.post(
        "/user/register",
        json={"username": "test", "email": email, "password": password},
    )

    assert response.status_code == 200
    response_json = response.json()
    assert response_json["accessToken"] is not None
    assert response_json["user"] == {
        "id": 1,
        "username": "test",
        "email": "valid@email.com",
    }


def test_create_user_invalid_email():
    response = client.post(
        "/user/register",
        json={"username": "test", "email": "invalidemail", "password": "secret"},
    )

    assert response.status_code == 422
    response_json = response.json()
    assert response_json["detail"] == [
        {
            "loc": ["body", "email"],
            "msg": "value is not a valid email address",
            "type": "value_error.email",
        }
    ]


def test_create_duplicate_user():
    response = client.post(
        "/user/register",
        json={"username": "test", "email": email, "password": password},
    )

    assert response.status_code == 400
    assert response.json() == {"detail": "Email already in use"}


def test_signin_with_correct_credentials():
    response = client.post("/user/signin", json={"email": email, "password": password})

    assert response.status_code == 200
    response_json = response.json()
    assert response_json["accessToken"] is not None
    assert response_json["user"] == {
        "id": 1,
        "username": "test",
        "email": "valid@email.com",
    }


def test_signin_with_incorrect_credentials():
    response = client.post(
        "/user/signin", json={"email": "valid@email.com", "password": "super-secret"}
    )

    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid credentials"}
