const express = require('express');
require('express-async-errors');
const { expressjwt } = require('express-jwt');
const cors = require('cors');
const config = require('./utils/config');

const blogsRouter = require('./routes/blogs');
const usersRouter = require('./routes/user');
const loginRouter = require('./routes/login');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRouter);

// Authorization: populates the request.auth object
app.use(expressjwt({ secret: config.ACCESS_TOKEN, algorithms: ['HS256'] }));

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

module.exports = app;
