const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String
    },
    description: String,
    status: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bug', schema);