const express = require('express');
const router = express.Router();

const controller = require('./controller');

// middleware to allow CORS
router.use(function (req, res, next) {
    var origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type");
    next();
});

router.post('/solve', controller.checkPuzzle);
router.post('/save', controller.savePuzzle);
router.get('/latest',controller.getLatestPuzzle)
router.get('/', controller.allPuzzles);


router.get('/blocks', controller.blocks);

//test api
router.get('/clear/all', controller.clearAll);



module.exports = router;