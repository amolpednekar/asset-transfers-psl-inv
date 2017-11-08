const express = require('express');
const router = express.Router();

const controller = require('./controllers/controller');

// middleware to allow CORS
router.use(function (req, res, next) {
    var origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', "*");
    next();
});

router.get('/users', controller.getUser);
router.post('/newUser', controller.newUser);

module.exports = router;