const Deal = require('./model');

function createDeal(req, res, next) {

    const newDeal = new Deal(req.body);
    newDeal.save(function (err) {
        if (err) return handleError(err);
    })

}

module.exports = { createDeal };
