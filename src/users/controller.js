// grab the user model
var User = require('./model');


/**
 * newUser: REST API to create new user.  
 */
exports.newUser = function (req, res) {
  console.log('======= New User RES API =======');
  var username = req.body.username;
  var password = req.body.password;


  console.log("details ", username, password)

  // create a new user
  var newUser = User({
    userName: username,
    balance: 100,
    blocksMined: 0
  });


  // Check if user exists
  User.find({
    userName: username
  }, function (err, user) {
    if (err) {
      console.log("Error , while checking exixting user", err);
      result = {
        message: "Error , while checking existing user" + err
      };

      res.status(500).json(result);

    }

    if (!user.length) {

      // save the user
      newUser.save(function (err) {
        if (err) {
          console.log("Error , while saving new user", err);
          result = {
            message: "Error,while saving new user" + err
          };

          res.status(500).json(result);
        }

        console.log('User created!');

        result = {
          message: "User created!"
        };
        res.status(201).json(result);
      });


    } else {
      console.log('User Exists!', user.length);

      result = {
        message: "User Exists!"
      };
      res.status(409).json(result);
    }
  });





}


// user login
exports.login = function (req, res) {
  console.log('======= user login REST API =======');

  username = req.body.username;
  password = req.body.password;

  console.log(req.body)
  // check if user exists 
    User.findOne({
    userName: username
  }, function (err, user) {
    if (err) {
      console.log("Error", err);

      result = {
        message: "error , while checking user exixts" + err
      };

      res.status(500).json(result);

    }
    console.log(user);
    if (!user || user == null) {
      result = {
        message: "User Not Found"
      };
      res.status(404).json(result);
    } else {
      result = {
        message: "Login successful"
      };
      res.status(200).json(result);
    }
  });

};




//Get All user
exports.getUsers = function (req, res) {
  console.log('======= Get user details REST API =======');


  // Get all the users
  User.find({}, function (err, users) {
    if (err) {
      console.log("Error", err);

      result = {
        message: "Error , while fetching all users" + err
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
  console.log('======= Get user details REST API =======');
  var username = req.query.username;

  // Get the User Details
  User.findOne({
    userName: username
  }, function (err, user) {
    if (err) {
      console.log("Error , while fetching user details", err);

      result = {
        message: "error" + err
      };

      res.status(500).json(result);
    }

    if (!user) {
      result = {
        message: "User Not Found"
      };
      res.status(409).json(result);
  }
  else
  {
    res.status(200).json(user);
  }
  });

};