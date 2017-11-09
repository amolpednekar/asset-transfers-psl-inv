const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({

    userName: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value',
        }
    },
    blocksMined: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});



const User = mongoose.model('User', userSchema);

module.exports = User;
