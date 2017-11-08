const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var puzzleSchema = new Schema({
    question: {
        type: String,
        required: true
    }, 
    answer: {
        type: String,
        required: true
    },

}, {
        timestamps: {
            createdAt: 'created_at'
        }
    });

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;
