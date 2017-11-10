const express = require('express');
const router = express.Router();

const controller = require('./controller');

// middleware to allow CORS
router.use(function (req, res, next) {
    var origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get('/', controller.getAllDeals);
router.post('/', controller.createDeal);
router.get('/latest', controller.getLatestDeal);

module.exports = router;
