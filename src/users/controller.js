// grab the user model
var User = require('./model');


/**
 * newUser: REST API to create new user.  
 */
exports.newUser = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('======= New User RES API =======');
  var username = req.body.username;
  var password = req.body.password;
 

console.log("details ",username,password)

// create a new user
var newUser = User({
  userName: username,
  password: password,
  balance: 100,
  blocksMined:0
});

// save the user
newUser.save(function(err) {
  if (err) 
  {
    throw err;
  
    result = {
      Status: 'Fail',
      Data: {
        message:"error"+err
      }
  };
  res.send(result);
  }
  console.log('User created!');
  
  result = {
    Status: 'Success',
    Data: {
        message:"User created!"
    }
};
res.send(result);
});



}


// user login
exports.login = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('======= user login REST API =======');

  username=req.body.username;
  password=req.body.password;
// Get the user details
User.find({ userName: username }, function(err, user) {
  if (err) 
  {
    throw err;
  
    result = {
      Status: 'Fail',
      Data: {
        message:"error"+err
      }
  };
  res.send(result);
  
  }

if( user.password == password)
{
  result = {
      Status: 'Success',
      Data: {
          message:"login success"
      }
  };
  res.send(result);
}
else
{
  result = {
    Status: 'Fail',
    Data: {
        message:"password not matching"
    }
};
res.send(result);
}
  
});



};




//Get All user
exports.getUser = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('======= Get user details REST API =======');


// Get all the users
User.find({}, function(err, users) {
  if (err) throw err;


  result = {
    Status: 'Success',
    Data: {
        message:users
    }
};
res.send(result);

  // Object of all the users
  console.log(users);
});

};


// Get User Balance
exports.getUserBalance = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('======= Get user details REST API =======');
  var username=req.body.username;

// Get the User Balance
User.find({userName:username}, function(err, user) {
  if (err) throw err;

var username=req.body.username;
  result = {
    Status: 'Success',
    Data: {
        message:user.balance
    }
};
res.send(result);

});

};



//Get user blocks mined
exports.getUserBlocks = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('======= Get UserBlocks REST API =======');

var username=req.body.username;
// Get the user details
User.find({userName:username}, function(err, user) {
  if (err) 
  {
    throw err;
  
    result = {
      Status: 'Fail',
      Data: {
          message:"error"+err
      }
  };
  res.send(result);
  }


  result = {
    Status: 'Success',
    Data: {
        message:user.blocksMined
    }
};
res.send(result);

});

};







