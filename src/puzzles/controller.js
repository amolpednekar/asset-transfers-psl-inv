const Puzzle = require('./puzzleModel');
const Block = require('./blockModel');

const _ = require('lodash');

var message = "";

function savePuzzle(req, res, next) {
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

}

function checkPuzzle(req, res, next) {
    console.log("check puzzle", req.body)
    // Check if puzzle exists in Puzzle DB
    const puzzle = Puzzle.find({ _id: req.body.id }).exec((err, result1) => {
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
                const result = Block.find({ pid: req.body.id }).exec((err, result2) => {
                    if (err) {
                        console.log("There was an error!");
                    } else if (Object.keys(result2).length > 0) {
                        // Block table already has puzzle id entry!
                        console.log("Already solved!");
                        res.send("Sorry, This Puzzle was already solved! Try again!")
                    } else {

                        // Save mining winner in block table!
                        blockAttributes = {
                            pid: req.body.id,
                            userName: req.body.userName
                        }

                        const newBlock = new Block(blockAttributes);

                        newBlock.save(function (err) {
                            if (err) {
                                message = "Error, couldn't save block miner to DB!";
                                console.log(message);
                                res.status(500).json(message);
                            } else {
                                console.log("Successfully saved block miner to DB!");
                                const response = "Congratulations! You win! Block saved."
                                res.status(200).json(response);
                            }
                        });
                    }
                })
            }else{
                res.send("Sorry! Incorrect Answer!")
            }
        }

    });
    //res.send("EOR")

}

module.exports = { savePuzzle, checkPuzzle }
