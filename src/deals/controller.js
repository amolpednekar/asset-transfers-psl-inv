const Deal = require('./model');
const User = require('../users/model');
const _ = require('lodash')

var message = "";

function createDeal(req, res, next) {

    const newDeal = new Deal(req.body);
    newDeal.save(function (err) {
        if (err) {
            message = "Error, couldn't save deal to DB!";
            console.log(message, err);
            res.status(500).json(message);
        } else {
            const response = req.body;
            const dealIdObj = {
                dealId: newDeal._id.toString()
            }
            _.assign(response, dealIdObj);

            // UPDATE USER BALANCES

            User.findOne({
                userName: req.body.fromUser
            }, (err, fromUser) => {
                if (err) {
                    message = "Error,There was an error updating fromUser balance!";
                    console.log(message, err);
                    res.status(500).json(message);
                }
                if (fromUser == undefined || fromUser == null) {
                    message = "from_user not found";
                    console.log(message);
                    res.status(404).json(message);
                } else {
                    //check toUser here
                    User.findOne({
                        userName: req.body.toUser
                    }, (err, toUser) => {
                        if (err) {
                            message = "Error, There was an error updating toUser Balance!";
                            console.log(message, err);
                            res.status(500).json(message);
                        }
                        if (toUser == undefined || toUser == null) {
                            message = "to_user not found";
                            console.log(message);
                            res.status(404).json(message);
                        } else {

                            //from user balance handling
                            newBalance1 = fromUser.balance - parseInt(req.body.amount);
                            fromUser.balance = newBalance1;

                            fromUser.save(function (err) {
                                if (err) {
                                    message = "fromUserErr not found";
                                    console.log(message);
                                    res.status(404).json(message);

                                } else {
                                    console.log("Updated fromUser");
                                    //to user balance handling
                                    newBalance1 = toUser.balance + parseInt(req.body.amount);
                                    toUser.balance = newBalance1;
                                    toUser.save(function (err) {
                                        if (err) {
                                            console.log("toUserErr", err);
                                            res.status(400).send("toUserErr" + err.errors.balance.message);
                                        } else {
                                            console.log("Updated toUser");

                                            console.log("Successfully saved deal to DB!");
                                            res.status(201).json(response);
                                        }

                                    });
                                }
                            });


                        }
                    })



                }


            })
        }
    })

}

function getAllDeals(req, res, next) {

    const deals = Deal.find({}).limit(10).sort({
        $natural: -1
    }).exec(function (err, obj) {
        if (err) {
            message = "Error, couldn't all deals from DB!";
            res.status(500).send(message);
        } else {
            res.status(200).json(obj);
        }
    });

}

module.exports = {
    createDeal,
    getAllDeals
};