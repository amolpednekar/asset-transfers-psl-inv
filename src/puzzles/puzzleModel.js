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
    status: {
        type: String,
        required: true,
        default: "Unanswered"
    }

}, {
        timestamps: {
            createdAt: 'created_at'
        }
    });

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;
