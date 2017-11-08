const Deal = require('./model');
const _ = require('lodash')

var message = "";

function createDeal(req, res, next) {

    const newDeal = new Deal(req.body);
    newDeal.save(function (err) {
        if (err) {
            message = "Error, couldn't save deal to DB!";
            console.log(message,err);
            res.status(500).json(message);
        } else {
            console.log("Successfully saved deal to DB!");
            const response = req.body;
            const dealIdObj = {
                dealId: newDeal._id.toString()
            }
            _.assign(response, dealIdObj);

            res.status(200).json(response);
            // TODO - UPDATE USER BALANCES
        }
    })

}

function getAllDeals(req, res, next) {

    const deals = Deal.find({}).limit(10).exec(function (err, obj) {
        if (err) {
            message = "Error, couldn't all deals from DB!";
            res.status(500).send(message);
        } else {
            res.status(200).json(obj);
        }
    });

}

module.exports = { createDeal, getAllDeals };
