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


  console.log("details ", username, password)

  // create a new user
  var newUser = User({
    userName: username,
    password: password,
    balance: 100,
    blocksMined: 0
  });


  // Get the user details
  User.find({
    userName: username
  }, function (err, user) {
    if (err) {
      console.log("Error", err);
      result = {
        message: "error" + err
      };

      res.status(500).json(result);

    }

      if(!user.length )
      {
       
      // save the user
      newUser.save(function (err) {
        if (err) {
          console.log("Error", err);
          result = {
            message: "error" + err
          };

          res.status(500).json(result);
        }

        console.log('User created!');

        result = {
          message: "User created!"
        };
        res.status(200).json(result);
      });


    } else {
      console.log('User Exists!',user.length);

      result = {
        message: "User Exists!"
      };
      res.status(500).json(result);
    }
  });





}


// user login
exports.login = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('======= user login REST API =======');

  username = req.body.username;
  password = req.body.password;

  console.log(req.body)
  // Get the user details
  User.findOne({
    userName: username
  }, function (err, user) {
    if (err) {
      console.log("Error", err);

      result = {
        message: "error" + err
      };

      res.status(500).json(result);

    }
console.log(user);
    if (!user) {
      result = {
        message: "User Not Found"
      };
      res.status(200).json(result);
    } else {

console.log("pass",user.password,password)

      if (user.password == password) {
        
        result = {
          message: "login success"
        };
        res.status(200).json(result);
      } else {
        result = {
          message: "password not matching"
        };
        res.status(200).json(result);
      }
  
  
    }
  
    });
  
     
    




};




//Get All user
exports.getUsers = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('======= Get user details REST API =======');


  // Get all the users
  User.find({}, function (err, users) {
    if (err) {
      console.log("Error", err);

      result = {
        message: "error" + err
      };

      res.status(500).json(result);
    }


    res.status(200).json(users);

    // Object of all the users
    console.log(users);
  });

};


// Get User Details
exports.getUserDetails = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log('======= Get user details REST API =======');
  var username = req.query.username;

  // Get the User Details
  User.findOne({
    userName: username
  }, function (err, user) {
    if (err) {
      console.log("Error", err);

      result = {
        message: "error" + err
      };

      res.status(500).json(result);
    }

    if(!user)
  {
       result = {
        message: "User Not Found"
      };
      res.status(200).json(result);
  }
  else
  {
    res.status(200).json(user);
  }
  });

};