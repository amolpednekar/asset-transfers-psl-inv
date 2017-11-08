const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const userRoutes = require('./users/routes');
const dealRoutes = require('./deals/routes');
const puzzleRoutes = require('./puzzles/routes');

mongoose.Promise = global.Promise;

const dbConnectionString = "mongodb://localhost:27017/asset-transfers"

mongoose.connect(dbConnectionString, { useMongoClient: true }, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected to MongoDB successfully');
    }
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 7071;

app.use(function (err, req, res, next) {
    res.status(err.status).json({
        message: err.message,
        error: err.error || "error"
    });
});

app.use('/', dealRoutes);
app.use('/', puzzleRoutes)
app.listen(port);

console.log('Rest Server listening on port ' + port);

