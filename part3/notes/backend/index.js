require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;

const unknownEndpoint = require('./middleware/unknownEndpoint');
const errorHandler = require('./middleware/errorHandler');

const apiRoutes = require('./routes/api');

// Access the static files in the build directory
app.use(express.static('../frontend/build'));
// Parse request bodies in JSON format
app.use(express.json());
// All requests from other origins
app.use(cors());
app.use(morgan('tiny'));

app.use('/api', apiRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Live on http://localhost:${PORT}`);
});
