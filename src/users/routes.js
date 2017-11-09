const express = require('express');
const router = express.Router();

const controller = require('./controller');

// middleware to allow CORS
router.use(function (req, res, next) {
    var origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', "*");
    next();
});

router.get('/all', controller.getUsers);
router.get('/:username', controller.getUserDetails);



router.post('/register', controller.newUser);
router.post('/login', controller.login);


module.exports = router;