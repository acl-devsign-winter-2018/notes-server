const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./utils/error-handler');

const notes = require('./routes/notes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(express.json());

app.use('/api', notes);

app.use(errorHandler());

module.exports = app;