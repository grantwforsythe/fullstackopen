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

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/login', loginRouter);
app.use('/api/blogs', userExtractor, blogsRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

module.exports = app;
