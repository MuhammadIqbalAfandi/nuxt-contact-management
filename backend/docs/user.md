# User API Spec

## Register User

Endpoint: POST /api/users

Request Body :

```json
{
  "username": "angeline",
  "password": "angelinedev",
  "name": "Angeline"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "angeline",
    "name": "Angeline"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username already registered"
}
```

## Login User

Endpoint: POST /api/users

Request Body :

```json
{
  "username": "angeline",
  "password": "angelinedev"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "angeline",
    "name": "Angeline",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username already registered"
}
```

## Get User

Endpoint: GET /api/users/current

Headers :

- authorization : token

Response Body (Success) :

```json
{
  "data": {
    "username": "angeline",
    "name": "Angeline"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username already registered"
}
```

## Update User

Endpoint: PATCH /api/users/current

Headers:

- Authorization : token

Request Body :

```json
{
  "password": "angelinedev", // optional, if want to change password
  "name": "Angeline" // optional, if want to change name
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "angeline",
    "name": "Angeline"
  }
}
```

## Logout User

Endpoint: DELETE /api/users/current

Headers:

- Authorization : token

Response Body (Success) :

```json
{
  "data": true
}
```
