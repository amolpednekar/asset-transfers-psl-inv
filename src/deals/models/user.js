const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    blocksMined: {
        type: Number,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
