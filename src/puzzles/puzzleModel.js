const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var puzzleSchema = new Schema({
    pid: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },

}, {
    timestamps: {
        createdAt: 'created_at'
    }
});




const  Puzzle= mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;
