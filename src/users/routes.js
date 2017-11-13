const express = require('express');
const router = express.Router();

const controller = require('./controller');

// middleware to allow CORS
router.use(function (req, res, next) {
    var origin = req.headers.origin; 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-Auth-Token");
    next();
});

router.get('/generate/names', controller.generateName);
router.get('/', controller.getUsers);
router.get('/:username', controller.getUserDetails);



router.post('/register', controller.newUser);
router.post('/login', controller.login);



module.exports = router;