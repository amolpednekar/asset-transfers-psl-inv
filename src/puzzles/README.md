### Puzzle 

#### Save a puzzle 

* Send `POST` to `/puzzles/save` with 
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

* Send `POST` to `/puzzles/solve` with 
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

* Send `Get` to `/puzzles/latest` with 

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

* Send `Get` to `/puzzles/all` with 

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

* Send `Get` to `/puzzles/blocks` with 

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