from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


email = "valid@email.com"
password = "secret"


def getCorrectUserCredentials():
    response = client.post(
        '/user/signin', json={"email": email, "password": password})
    response_json = response.json()

    return {'content-type': 'application/json;charset=UTF-8',
            'authorization': 'bearer ' + response_json['accessToken']
            }


def createWrongUserCredentials():
    response = client.post(
        '/user/register', json={"username": "bad-user", "email": "somebody@else.com", "password": "something"})
    response_json = response.json()

    return {'content-type': 'application/json;charset=UTF-8',
            'authorization': 'bearer ' + response_json['accessToken']
            }


def getWrongUserCredentials():
    response = client.post(
        '/user/signin', json={"email": "somebody@else.com", "password": "something"})
    response_json = response.json()

    print(response_json)

    return {'content-type': 'application/json;charset=UTF-8',
            'authorization': 'bearer ' + response_json['accessToken']
            }


def getOriginalPostForUpdate():
    headers = getCorrectUserCredentials()
    original_post = client.get('/post/', headers=headers)
    original_post_json = original_post.json()
    return original_post_json
