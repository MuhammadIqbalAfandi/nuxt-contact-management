# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "first_name": "Angeline",
  "last_name": "You",
  "email": "angelineyou@example.com",
  "phone": "083188731111"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "first_name": "angeline",
    "last_name": "You",
    "email": "angelineyou@example.com",
    "phone": "083188731111"
  }
}
```

## Get Contact

Endpoint : POST /api/contacts/:contactId

Headers :

- Authorization : token

Response Body :

```json
{
  "data": {
    "id": 1,
    "first_name": "angeline",
    "last_name": "You",
    "email": "angelineyou@example.com",
    "phone": "083188731111"
  }
}
```

## Update Contact

Endpoint : PUT /api/contacts/:contactId

Headers :

- Authorization : token

Request Body :

```json
{
  "first_name": "Angeline",
  "last_name": "You",
  "email": "angelineyou@example.com",
  "phone": "083188731111"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "first_name": "angeline",
    "last_name": "You",
    "email": "angelineyou@example.com",
    "phone": "083188731111"
  }
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:contactId

Header :

- Authorization : token

Response Body :

```json
{
  "data": true
}
```

## Search Contact

Endpoint : DELETE /api/contact/:contactId

Header :

- authorization : token

Query Params :

- name: string, contact first name or last name,
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Response Body :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Angeline",
      "last_name": "you",
      "email": "angelineyou@example.com",
      "phone": "083188731111"
    },
    {
      "id": 2,
      "first_name": "Grace",
      "last_name": "Nat",
      "email": "gracenat@example.com",
      "phone": "083188732222"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
