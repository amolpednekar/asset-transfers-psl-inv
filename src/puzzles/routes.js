const express = require('express');
const router = express.Router();

const controller = require('./controller');

// middleware to allow CORS
router.use(function (req, res, next) {
    var origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', "*");
    next();
});

router.post('/puzzle/answer', controller.checkPuzzle);
router.post('/puzzle', controller.savePuzzle);

module.exports = router;