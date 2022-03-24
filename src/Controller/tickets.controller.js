const { getLocations, getTrains, bookTickets, getBookings } = require('../Service/tickets.service');

const getLocation = async(req, res) => {
    try {
        const search = req.query.search;
        const locations = await getLocations(search);
        res.json({ status: true, locations});
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

const getTrain = async(req, res) => {
    try {
        const fromLocation = req.query.fromLocation;
        const toLocation = req.query.toLocation;
        const trainId = req.query.trainId;
        const trains = await getTrains(fromLocation, toLocation, trainId);
        res.json({ status: true, trains});
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

const bookTicket = (req, res) => {
    try {
        const { trainId, passengers, classs, category } = req.body;
        const userId = res.locals.userId;
        const booked  = bookTickets(trainId, passengers, userId, classs, category);
        res.json({status: true, booked})
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
} 

const getBooking = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const booked  = await getBookings(userId);
        res.json({status: true, booked})
        return;
    }
    catch (error) {
        console.log(error)
        res.json(error);
    }
}

module.exports = {
    getLocation,
    getTrain,
    bookTicket,
    getBooking
}