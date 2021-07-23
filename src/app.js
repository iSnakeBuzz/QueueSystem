require('dotenv').config();

// Imports
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const index = require('./routes/index');

// Games Routes
const queuePut = require('./routes/queue/queuePut');
const queueRemove = require('./routes/queue/queueRemove');

const app = express();

// Loading some requirements
require('./Databases/RedisConnector');

// Configuring Express APP
app.use(logger('dev', { skip: () => process.env.NODE_ENV !== 'test' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (!process.env.DISABLE_GAMEDATA) {
    app.use('/', index);
    app.use('/queue/add', queuePut);
    app.use('/queue/remove', queueRemove);
}

// catch 404 and forward to error handler
app.use(function (_req, res) {
    res.status(404).json({ error: true, message: 'Page not fond' });
});

// error handler
app.use(function (err, req, res) {
    // render the error page
    res.status(500);
    res.json({
        status: 500,
        message: 'An error was ocurred',
        err
    });
});

module.exports = app;
