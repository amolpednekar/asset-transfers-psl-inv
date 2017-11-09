const express = require('express');
const router = express.Router();

const controller = require('./controller');

// middleware to allow CORS
router.use(function (req, res, next) {
    var origin = req.headers.origin;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get('/getUsers', controller.getUsers);
router.get('/getUserDetails', controller.getUserDetails);



router.post('/newUser', controller.newUser);
router.post('/login', controller.login);


module.exports = router;