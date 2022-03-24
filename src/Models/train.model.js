const mongoose = require('mongoose');

const trainsSchema = mongoose.Schema({
    name: {
        type: String
    },
    no: {
        type: Number
    },
    fromLocation: {
        type: String
    },
    toLocation: {
        type: String
    },
    runs: {
        type: Array
    },
    date: {
        type: Date
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    seats: {
        type: Array
    }
});

module.exports = mongoose.model('trains', trainsSchema);