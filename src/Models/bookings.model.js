const mongoose = require('mongoose');

const bookingsSchema = mongoose.Schema({
    userId: {
        type: String
    },
    trainId: {
        type: String
    },
    class: {
        type: String
    },
    category: {
        type: String
    },
    passengers: {
        type: Array,
    },
    bookedAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('bookings', bookingsSchema);