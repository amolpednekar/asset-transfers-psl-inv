### User 

#### Register a new user 

* Send `POST` to `/users/register` with 
header
```
Content-Type: application/x-www-form-urlencoded
```
Request body 
```json
{
  "username": "Bob"
}
```

* Response (Success) 
```json
{
    "message": "User created!"
}
```
* Response (Conflict)
```json
{
    "message": "User Exists!"
}
```


#### Login a user

* Send `POST` to `/users/login` 

* Response (Success)
```json
{
    "message": "login success"
}
```
* Response (Conflict)
```json
{
    "message": "User Not Found"
}
```

#### Get all users

* Send `GET` to `/users` 

* Response (Success)
```json
[
    {
        "_id": "5a0433aaf85c058190ee9c1b",
        "updatedAt": "2017-11-09T10:53:30.648Z",
        "created_at": "2017-11-09T10:53:30.648Z",
        "userName": "Bob2",
        "balance": 100,
        "blocksMined": 0,
        "__v": 0
    }
]
```
#### Get User Details

* Send `GET` to `/users/:username` 

* Response (Success)
```json
{
    "_id": "5a0433aaf85c058190ee9c1b",
    "updatedAt": "2017-11-09T10:53:30.648Z",
    "created_at": "2017-11-09T10:53:30.648Z",
    "userName": "Bob",
    "balance": 100,
    "blocksMined": 0,
    "__v": 0
}
```

* Response (Conflict)
```json
{
    "message": "User Not Found"
}
```


#### Generate username

* Send `GET` to `/generate/names` 

* Response (Success)
```json
"rigid_machine"
```
