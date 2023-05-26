const express = require('express');
require('express-async-errors');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const blogsRouter = require('./routes/blogs');
const usersRouter = require('./routes/user');
const loginRouter = require('./routes/login');

const userExtractor = require('./middleware/userExtractor');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Access the static files in the build directory
app.use(express.static('../frontend/build'));
// Parse request bodies in JSON format
app.use(express.json());
// Parse cookies
app.use(cookieParser());
// All requests from other origins
app.use(cors());

app.use('/api/login', loginRouter);
app.use('/api/blogs', userExtractor, blogsRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

module.exports = app;
