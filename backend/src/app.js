const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { clientOrigins } = require('./config/env');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: clientOrigins }));
app.use(express.json());

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
