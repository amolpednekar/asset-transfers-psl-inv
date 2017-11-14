### Deals 

#### Create a deal (transaction)

* Send `POST` to `/deals` with 
header
```
Content-Type: application/x-www-form-urlencoded
```
Request body 
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
        "_id": "5a03e5f0a6457d344c4e5f05",
        "updatedAt": "2017-11-09T05:22:48.195Z",
        "created_at": "2017-11-09T05:21:52.038Z",
        "fromUser": "Siddesh2",
        "toUser": "Siddesh",
        "amount": 10,
        "__v": 0,
        "bid": "10"
    }
]
```

#### Get last 5 created deals (transaction)

* Send `GET` to `/deals/latest` 

* Response (Success)
```json
[
    {
        "_id": "5a03e5f0a6457d344c4e5f05",
        "updatedAt": "2017-11-09T05:22:48.195Z",
        "created_at": "2017-11-09T05:21:52.038Z",
        "fromUser": "Siddesh2",
        "toUser": "Siddesh",
        "amount": 10,
        "__v": 0,
        "bid": "10"
    },
]
```


