const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/myapp');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


var port = process.env.PORT || 7071;
var routes = require('./deals/routes')
var handleError = (err)=>{
    console.log("Got an error", err);
}

app.use('/', routes)
app.listen(port);
console.log('Rest Server listening on port ' + port);

