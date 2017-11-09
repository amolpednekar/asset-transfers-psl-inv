const Puzzle = require('./puzzleModel');
const Block = require('./blockModel');
const Deal = require('../deals/model');
const User = require('../users/model');

const _ = require('lodash');

var message = "";

function savePuzzle(req, res, next) {

    // Find the last submitted Puzzle
    Puzzle.findOne({}).limit(1).sort({
        $natural: -1
    }).exec((err, findLastPuzzleResponse) => {
        console.log("findLastPuzzleResponse", findLastPuzzleResponse);
        if (err) {
            message = "Error, there was an error in the DB!";
            console.log(message);
            res.status(500).json(message);
        } else if (findLastPuzzleResponse == null || findLastPuzzleResponse.status == "Answered") { // If answered, proceed to saving new puzzle
            const newPuzzle = new Puzzle(req.body);
            newPuzzle.save(function (err) {
                if (err) {
                    message = "Error, couldn't save puzzle to DB!";
                    console.log(message);
                    res.status(500).json(message);
                } else {
                    console.log("Successfully saved puzzle to DB!");
                    const response = req.body;
                    const puzzleIdObj = {
                        puzzleId: newPuzzle._id.toString()
                    }
                    _.assign(response, puzzleIdObj);

                    res.status(200).json(response);
                }
            });
        } else {
            // Unanswered, send id & response
            obj = {
                msg: "Previous puzzle unanswered! Please wait",
                pid: findLastPuzzleResponse._id
            }
            res.send(obj)
        }
    })
}

function checkPuzzle(req, res, next) {
    console.log("check puzzle", req.body)
    // Check if puzzle exists in Puzzle DB
    const puzzle = Puzzle.find({
        _id: req.body.id
    }).exec((err, result1) => {
        if (err) {
            console.log("There was an error!");
            res.send("Error! Invalid Puzzle Id!")
        } else if (Object.keys(result1).length == 0) {
            console.log("Puzzle doesnt exist!")
            res.send("Error! Puzzle doesnt exist!");
        } else {
            console.log("Object.keys(res).length", Object.keys(result1).length)
            console.log("Found puzzle!", result1)
            // Check db puzzle answer with request answer
            console.log("result1.answer == req.body.answer", result1[0].answer == req.body.answer, result1[0].answer, req.body.answer)
            if (result1[0].answer == req.body.answer) {
                // Check if block table has already solved solution
                const result = Block.find({
                    pid: req.body.id
                }).exec((err, result2) => {
                    if (err) {
                        console.log("There was an error!");
                    } else if (Object.keys(result2).length > 0) {
                        // Block table already has puzzle id entry!
                        console.log("Already solved!", result2);
                        res.send("Sorry, Correct! , But this Puzzle was already solved! Try again!")
                    } else {
                        // Change status if question to answered
                        Puzzle.update({
                            _id: req.body.id
                        }, {
                            status: "Answered"
                        }, (err, result4) => {
                            if (err) {
                                console.log("There was an error while changing the status!", err);
                            } else {
                                console.log("Updated!")
                            }
                        })



                        // Save mining winner in block table!
                        blockAttributes = {
                            pid: req.body.id,
                            userName: req.body.userName
                        }
                        const newBlock = new Block(blockAttributes);

                        newBlock.save(function (err) {
                            if (err) {
                                message = "Error, couldn't save block miner to DB!";
                                console.log(message, err);
                                res.status(500).json(message);
                            } else {
                                console.log("Successfully saved block miner to DB!");
                                const response = "Congratulations! You win! Block saved."

                                //Add deals to the new block

                                Deal.update({
                                    bid: null
                                }, {
                                    bid: newBlock.bid.toString()
                                },{multi: true}, function (err, deal) {
                                    if (err) {
                                        message = "Error! ,couldnt add block id to deal";
                                        console.log(message, err);
                                        res.status(500).json(message);
                                    }

                                    // user block mined.
                                    User.update({
                                        userName: req.body.userName
                                    }, {
                                        $inc: {
                                            blocksMined: 1
                                        }
                                    }, function (err, user) {
                                        if (err) {
                                            message = "Error, coudnt increment blocks mined!";
                                            console.log(message, err);
                                            res.status(500).json(message);
                                        }

                                        res.status(200).json(response);
                                    })
                                    console.log(deal);
                                });

                            }
                        });
                    }
                })
            } else {
                res.send("Sorry! Incorrect Answer!")
            }
        }

    });
    //res.send("EOR")

}

function blocks(req, res, next) {

    // Get all the users
    Block.find({}, function (err, blocks) {
        if (err) {
            console.log("Error", err);

            result = {
                message: "error" + err
            };

            res.status(500).json(result);
        }


        res.status(200).json(blocks);

        //all blocks
        console.log(blocks);
    });

}




function getLatestPuzzle(req, res, next) {
    Puzzle.findOne({}).limit(1).sort({
        $natural: -1
    }).exec((err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
}


function allPuzzles(req, res, next) {
    Puzzle.find({}).exec((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

function clearAll(req, res, next) {
    Puzzle.remove({}).exec((err, results) => {
        if (err) {
            res.send(err);
        } else {
            Block.remove({}).exec((err, results) => {
                if (err) {
                    res.send(err);
                } else {
                    User.remove({}).exec((err, results) => {
                        if (err) {
                            res.send(err);
                        } else {
                            Deal.remove({}).exec((err, results) => {
                                if (err) {
                                    res.send(err);
                                } else {
                                    res.json(results);
                                }
                            });
                           
                        }
                    });
                    
                }
            });
            

        }
    });

}


module.exports = {
    savePuzzle,
    checkPuzzle,
    getLatestPuzzle,
    blocks,
    allPuzzles,
    clearAll
}