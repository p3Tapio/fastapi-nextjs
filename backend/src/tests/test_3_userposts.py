from src.tests.utils import (
    client,
    get_correct_user_credentials,
    create_user_with_wrong_credentials,
    get_wrong_user_credentials,
    get_original_post,
)


def test_post():
    headers = get_correct_user_credentials()
    response = client.post(
        "/post/",
        headers=headers,
        json={"title": "test title", "description": "this is a test description"},
    )
    assert response.status_code == 200


def test_extra_fields_in_post():
    headers = get_correct_user_credentials()
    response = client.post(
        "/post/",
        headers=headers,
        json={
            "title": "test title",
            "description": "this is a test description",
            "another": "field",
        },
    )

    assert response.status_code == 422
    response_json = response.json()
    assert response_json == {
        "detail": [
            {
                "loc": ["body", "another"],
                "msg": "extra fields not permitted",
                "type": "value_error.extra",
            }
        ]
    }


def test_missing_field_in_post():
    headers = get_correct_user_credentials()
    response = client.post("/post/", headers=headers, json={"title": "test title"})

    response_json = response.json()
    assert response.status_code == 422
    assert response_json["detail"][0]["msg"] == "field required"


def test_get_posts_with_wrong_user():
    headers = create_user_with_wrong_credentials()
    response = client.get("/post/", headers=headers)

    response_json = response.json()
    assert response.status_code == 200
    assert response_json == []


def test_get_posts_with_correct_user():
    headers = get_correct_user_credentials()
    response = client.get("/post/", headers=headers)

    response_json = response.json()
    assert response.status_code == 200
    assert response_json == [
        {
            "description": "this is a test description",
            "id": 1,
            "owner_id": 1,
            "public": False,
            "title": "test title",
        }
    ]


def test_update_post_with_wrong_user():
    headers = get_wrong_user_credentials()
    original_post_json = get_original_post()
    updated_post = {
        "id": original_post_json[0]["id"],
        "title": "This is a new title",
        "public": False,
        "description": "A different description",
    }

    response = client.put("/post/", headers=headers, json=updated_post)

    response_json = response.json()
    assert response.status_code == 404
    assert response_json == {"detail": "Not found"}


def test_update_post_with_correct_user():
    original_post_json = get_original_post()
    headers = get_correct_user_credentials()

    updated_post = {
        "id": original_post_json[0]["id"],
        "title": "This is a new title",
        "public": True,
        "description": "A different description",
    }
    response = client.put("/post/", headers=headers, json=updated_post)

    response_json = response.json()
    assert response.status_code == 200
    assert response_json == {
        "message": "update success",
        "updatedPost": {
            "id": 1,
            "owner_id": 1,
            "title": "This is a new title",
            "public": True,
            "description": "A different description",
        },
    }


def test_delete_post_with_wrong_user():
    headers = get_wrong_user_credentials()
    original_post_json = get_original_post()

    response = client.delete(
        "/post/" + str(original_post_json[0]["id"]), headers=headers
    )

    response_json = response.json()
    assert response.status_code == 404
    assert response_json == {"detail": "Not found"}


def test_delete_post_with_correct_user():
    headers = get_correct_user_credentials()
    original_post_json = get_original_post()

    response = client.delete(
        "/post/" + str(original_post_json[0]["id"]), headers=headers
    )

    response_json = response.json()
    assert response.status_code == 200
    assert response_json == {"id": 1, "message": "delete success"}
