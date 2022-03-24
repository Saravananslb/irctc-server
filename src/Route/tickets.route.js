const express = require('express');
const { getLocation, getTrain, bookTicket, getBooking } = require('../Controller/tickets.controller');
const isAuthenticated  = require('../Middleware/auth.middleware');
const router = express.Router();

router.get('/location', getLocation);
router.get('/trains', getTrain);
router.post('/book', isAuthenticated, bookTicket);
router.get('/bookings', isAuthenticated, getBooking);
// router.put('/checkout', isAuthenticated, checkoutItem);

module.exports = router;