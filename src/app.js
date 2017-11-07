const express = require('express');
const app = express();
const mongoose = require('mongoose');

const deals = require('./deals/routes')

var handleError = (err)=>{
    console.log("Got an error", err);
}

app.use('/', deals);

app.listen(5000);
