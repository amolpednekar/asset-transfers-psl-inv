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

router.post('/puzzle/answer', controller.checkPuzzle);
router.post('/puzzle', controller.savePuzzle);
router.get('/puzzle',controller.getLatestPuzzle)

router.get('/blocks', controller.blocks);
router.get('/allPuzzles', controller.allPuzzles);

//test api
router.get('/clearAll', controller.clearAll);



module.exports = router;