const Deal = require('./model');

var message = "";

function createDeal(req, res, next) {

    const newDeal = new Deal(req.body);
    newDeal.save(function (err) {
        if (err) {
            message = "Error, couldn't save deal to DB!";
            console.log(message);
            res.status(500).json(message);
        } else {
            console.log("Successfully saved deal to DB!");
            res.status(200).json(req.body);

            // TODO - UPDATE USER BALANCES
        }
    })

}

function getAllDeals(req, res, next) {

    const deals = Deal.findOne({fromUser:"amol"});
    console.log(deals);
    res.send(deals);

}

module.exports = { createDeal, getAllDeals };
