# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "1-1 Chiyoda",
  "city": "Tokyo",
  "province": "Tokyo",
  "country": "Japan",
  "postal_code": "100-0001"
}
```

Response Body :

```json
{
  "data": {
    "street": "1-1 Chiyoda",
    "city": "Tokyo",
    "province": "Tokyo",
    "country": "Japan",
    "postal_code": "100-0001"
  }
}
```

## Get Address

Endpoint : GET /api/contacts/:contactId/address/:addressId

Headers :

- Authorization : token

Response Body

```json
{
  "data": {
    "street": "1-1 Chiyoda",
    "city": "Tokyo",
    "province": "Tokyo",
    "country": "Japan",
    "postal_code": "100-0001"
  }
}
```

## Update Address

Endpoint : PUT /api/contact/:contactId/address/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "1-1 Chiyoda",
  "city": "Tokyo",
  "province": "Tokyo",
  "country": "Japan",
  "postal_code": "100-0001"
}
```

Response Body :

```json
{
  "data": {
    "street": "Jalan Merdeka No. 10",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "10110"
  }
}
```

## Remove Address

Endpoint : DELETE /api/contact/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body :

```json
{
  "data": true
}
```

## List Addresses

Endpoint : GET /api/contact/:contactId/addresses

Headers :

- Authorization :token

Response Body

```json
{
  "data": [
    {
      "street": "1-1 Chiyoda",
      "city": "Tokyo",
      "province": "Tokyo",
      "country": "Japan",
      "postal_code": "100-0001"
    },
    {
      "street": "1-1 Chiyoda",
      "city": "Tokyo",
      "province": "Tokyo",
      "country": "Japan",
      "postal_code": "100-0001"
    }
  ]
}
```
