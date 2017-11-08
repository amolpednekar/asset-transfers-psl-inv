const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var blockSchema = new Schema({
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





const Block = mongoose.model('Block', blockSchema);


module.exports = Block
