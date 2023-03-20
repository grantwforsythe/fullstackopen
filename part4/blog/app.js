const express = require('express');
require('express-async-errors');
const cors = require('cors');

const app = express();
const blogsRouter = require('./routes/blogs');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.use(errorHandler);

module.exports = app;
