const Deal = require('./model');

function createDeal(req, res, next) {

    const newDeal = new Deal(req.body);
    newDeal.save(function (err) {
        if (err){
            console.log("Error saving to DB!")
        }else{
            console.log("Success!");
        }
    })

}

module.exports = { createDeal };
