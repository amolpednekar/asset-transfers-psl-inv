const express = require('express');
const router = express.Router();

const controller = require('./controller');

// middleware to allow CORS
router.use(function (req, res, next) {
    var origin = req.headers.origin;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.post('/solve', controller.checkPuzzle);
router.post('/save', controller.savePuzzle);
router.get('/latest',controller.getLatestPuzzle)
router.get('/', controller.allPuzzles);


router.get('/blocks', controller.blocks);

router.get('/blocks/:bid', controller.getAllBlockDeals);

//test api
router.get('/clear/all', controller.clearAll);



module.exports = router;