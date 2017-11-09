### User 

#### Register a new user 

* Send `POST` to `users/register` with 
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

* Send `POST` to `users/login` 

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

* Send `GET` to `users/all` 

* Response (Success)
```json
[
    {
        "_id": "5a03e468a6457d344c4e5efd",
        "updatedAt": "2017-11-09T05:22:48.197Z",
        "created_at": "2017-11-09T05:15:20.533Z",
        "userName": "Siddesh2",
        "password": "asdf123",
        "balance": 100,
        "blocksMined": 3,
        "__v": 0
    }
]
```
#### Get User Details

* Send `GET` to `users/:username` 

* Response (Success)
```json
{
    "_id": "5a03e5aaa6457d344c4e5f03",
    "updatedAt": "2017-11-09T05:20:42.887Z",
    "created_at": "2017-11-09T05:20:42.887Z",
    "userName": "Siddesh",
    "password": "asdf123",
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