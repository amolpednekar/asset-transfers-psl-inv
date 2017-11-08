### Deals 

#### Create a deal (transaction)

* Send `POST` to `/deals` with 
header
```
Content-Type: application/x-www-form-urlencoded
```
body like
```json
{
  "fromUser": "Bob",
  "toUser": "Alice",
  "amount": "500"
}
```

* Response (Success)
```json
{
    "fromUser": "Bob",
    "toUser": "Alice",
    "amount": "500",
    "dealId": "5a029b1c350cc3607ccb7567"
}
```

#### Get all deals (transaction)

* Send `GET` to `/deals` 

* Response (Success)
```json
[
    {
        "_id": "5a0281efc0d35773544e92d0",
        "updatedAt": "2017-11-08T04:02:55.419Z",
        "created_at": "2017-11-08T04:02:55.419Z",
        "fromUser": "amol",
        "toUser": "sid",
        "amount": 200,
        "__v": 0
    },
]
```


