const locationSchema = require('../Models/location.model');
const trainsSchema = require('../Models/train.model');
const bookingsSchema = require('../Models/bookings.model');
const { endOfDay, startOfDay } = require('date-fns');

const COACH = {
    'Second Sitting (2S)': {
        code: 'S',
        seatCount: 72 
    }
}

const getLocations = async(location) => {
    const locations = await locationSchema.find();
    const loc = locations.filter(item => {
        if (item.name.includes(location) || item.pinCode.includes(location) || item.district.includes(location) || item.state.includes(location)) {
            return item;
        }
    })
    return loc;
}

const getTrains = async(fromLocation, toLocation, trainId) => {
    let trains = [];
    if (trainId)
        trains = await trainsSchema.findById(trainId);
    else if (fromLocation)
        trains = await trainsSchema.find({fromLocation, toLocation});
    
    return trains;
}

const bookTickets = async(trainId, passengers, userId, classs, category) => {
    const newPass = passengers.map(item => {
        item.seatNo = `${COACH[classs].code} ${Math.floor(Math.random(0, COACH[classs].seatCount) * 10)}`
        return item;
    })
    const book = new bookingsSchema({
        trainId: trainId,
        passengers: newPass,
        userId: userId,
        class: classs,
        category: category
    })
    const booked = await book.save();
    return booked._doc;
}

const getBookings = async(userId) => {
    let book = [];
    const trainObj = {};
    const locationObj = {};
    const bookings = await bookingsSchema.find({userId});
    const trains = await trainsSchema.find();
    const location = await locationSchema.find();
    location.map(item => {locationObj[item._id] = item});
    const ticketsBooks = JSON.parse(JSON.stringify(bookings));
    // console.log(ticketsBooks)
    trains.map(item => {
        trainObj[item._id] = item;
    })
    ticketsBooks.map(item => {
        // console.log(item)
        item.trains = trainObj[item.trainId];
        item.fromLocation = locationObj[trainObj[item.trainId].fromLocation].name;
        item.toLocation = locationObj[trainObj[item.trainId].toLocation].name;
        // console.log(item)
        book.push(item)
        return item;
    })
    return book;
}


module.exports = {
    getLocations,
    getTrains,
    bookTickets,
    getBookings
}