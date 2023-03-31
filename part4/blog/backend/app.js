const express = require('express');
require('express-async-errors');
const cors = require('cors');

const app = express();
const blogsRouter = require('./routes/blogs');
const usersRouter = require('./routes/user');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

module.exports = app;
