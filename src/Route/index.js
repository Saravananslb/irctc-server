const express = require('express');
const authRouter = require('./auth.route');
const ticketRouter = require('./tickets.route');

const app = express();

app.use('/auth', authRouter);
app.use('/tickets', ticketRouter);

module.exports = app;