### User 

#### Register a new user 

* Send `POST` to `/newUser` with 
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

* Send `POST` to `/login` 

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

* Send `GET` to `/getUsers` 

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

* Send `GET` to `/getUserDetails` 

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


### Puzzle 

#### Save a puzzle 

* Send `POST` to `/puzzle` with 
header
```
Content-Type: application/x-www-form-urlencoded
```
Request body 
```json
{
  "question": "what is 3+5+9?",
  "answer":"17"
}
```

* Response (Success) 
```json
{
    "question": "what is 3+5+9?",
    "answer": "17",
    "puzzleId": "5a040346b503e14a58979f18"
}
```
* Response (Conflict)
```json
{
    "msg": "Previous puzzle unanswered! Please wait",
    "pid": "5a040346b503e14a58979f18"
}
```

#### Answer/Check puzzle 

* Send `POST` to `/puzzle/answer` with 
header
```
Content-Type: application/x-www-form-urlencoded
```
Request body 
```json
{
  "id": "5a040346b503e14a58979f18",
  "username":"siddesh",
  "answer":"17"
}
```

* Response (Success) 
```json
"Congratulations! You win! Block saved."
```
* Response (Conflict)
```json
"Sorry, Correct! , But this Puzzle was already solved! Try again!"
```


#### Get Latest puzzle 

* Send `Get` to `/puzzle` with 

* Response (Success) 
```json
{
    "_id": "5a040346b503e14a58979f18",
    "updatedAt": "2017-11-09T07:27:02.052Z",
    "created_at": "2017-11-09T07:27:02.052Z",
    "question": "what is love?",
    "answer": "babyDonHurty",
    "__v": 0,
    "status": "Unanswered"
}
```

#### Get All puzzles

* Send `Get` to `/allPuzzles` with 

* Response (Success) 
```json
[
    {
        "_id": "5a03e4c0a6457d344c4e5eff",
        "updatedAt": "2017-11-09T05:17:56.186Z",
        "created_at": "2017-11-09T05:16:48.876Z",
        "question": "what is love?",
        "answer": "babyDonHurty",
        "__v": 0,
        "status": "Answered"
    }
]
```


#### Get All blocks

* Send `Get` to `/blocks` with 

* Response (Success) 
```json
[
    {
        "_id": "5a03e504a6457d344c4e5f00",
        "bid": 8,
        "updatedAt": "2017-11-09T05:17:56.190Z",
        "created_at": "2017-11-09T05:17:56.190Z",
        "pid": "5a03e4c0a6457d344c4e5eff",
        "userName": "Siddesh2",
        "__v": 0
    }
]
```

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




