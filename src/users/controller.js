// grab the user model
var User = require('../models/user');


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
  if (err) throw err;

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


exports.getUser = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('======= Get user details REST API =======');


// get all the users
User.find({}, function(err, users) {
  if (err) throw err;


  result = {
    Status: 'Success',
    Data: {
        message:users
    }
};
res.send(result);

  // object of all the users
  console.log(users);
});

};




