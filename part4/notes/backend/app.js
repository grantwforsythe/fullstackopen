const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const unknownEndpoint = require('./middleware/unknownEndpoint');
const errorHandler = require('./middleware/errorHandler');

const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');

// Access the static files in the build directory
app.use(express.static('../frontend/build'));
// Parse request bodies in JSON format
app.use(express.json());
// All requests from other origins
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

app.use(loginRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
