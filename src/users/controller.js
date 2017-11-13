var User = require('./model');
var Moniker = require('moniker');


function newUser(req, res) {
  console.log('======= New User REST API =======');
  var username = req.body.username;

  console.log("details ", username);

  var newUser = User({
    userName: username,
    balance: 100,
    blocksMined: 0
  });

  // Check if user exists
  User.find({ userName: username }, function (err, user) {
    if (err) {
      console.log("Error , while checking exixting user", err);
      result = {
        message: "Error , while checking existing user" + err
      };
      res.status(500).json(result);

    } else {
      if (!user.length) {
        // save the user
        newUser.save(function (err) {
          if (err) {
            console.log("Error , while saving new user", err);
            result = {
              message: "Error,while saving new user" + err
            };
            res.status(500).json(result);

          } else {
            console.log('User created!');

            result = {
              message: "User created!"
            };
            res.status(201).json(result);
          }
        });
      } else {
        console.log('User Found!', user.length);

        result = {
          message: "User Found, logging in!"
        };
        res.status(200).json(result);
      }
    }
  });

}

// user login
function login(req, res) {
  console.log('======= user login REST API =======');

  username = req.body.username;

  console.log(req.body)
  // check if user exists 
  User.findOne({ userName: username }, function (err, user) {
    if (err) {
      console.log("Error", err);
      result = { message: "error , while checking user exixts" + err };
      res.status(500).json(result);
    } else {
      if (!user || user == null) {
        result = { message: "User Not Found" };
        res.status(404).json(result);
      } else {
        result = { message: "Login successful" };
        res.status(200).json(result);
      }
    }
  });
};

//Get All users
function getUsers(req, res) {
  console.log('======= Get user details REST API =======');

  User.find({}, function (err, users) {
    if (err) {
      console.log("Error", err);
      result = { message: "Error , while fetching all users" + err };
      res.status(500).json(result);
    } else {
      console.log("Users obj", users);
      res.status(200).json(users);
    }
  });

};

// Get User Details
function getUserDetails(req, res) {
  console.log('======= Get user details REST API =======');
  var username = req.params.username;
  console.log(username);
  
  User.findOne({ userName: username }, function (err, user) {
    if (err) {
      console.log("Error , while fetching user details", err);
      result = {
        message: "error" + err
      };
      res.status(500).json(result);
    } else {
      if (!user) {
        result = {  message: "User Not Found" };
        res.status(409).json(result);
      }
      else {
        res.status(200).json(user);
      }
    }
  });
};

// Generate usename
function generateName(req, res) {
  console.log('======= Generate usename REST API =======');
  var names = Moniker.generator([Moniker.adjective, Moniker.noun], {
    glue: '_'
  });
  console.log(names.choose());
  res.status(200).json(names.choose());
};

module.exports = { newUser, login, getUsers, getUserDetails, generateName }