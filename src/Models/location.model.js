const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    name: {
        type: String
    },
    pinCode: {
        type: Number
    },
    district: {
        type: String,
    },
    state: {
        type: String
    }
});

module.exports = mongoose.model('locations', locationSchema);