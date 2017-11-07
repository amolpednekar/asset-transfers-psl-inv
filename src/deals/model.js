const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var dealsSchema = new Schema({
    fromUser: {
        type: String,
        required: true
    },
    toUser: {
        type: String,
        required: true
    },
    amount: {
        type: Integer,
        required: true
    }
}, {
        timestamps: {
            createdAt: 'created_at'
        }
    });

const Deal = mongoose.model('Deal', publicationSchema);

module.exports = Deal;
