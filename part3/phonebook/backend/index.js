require('dotenv').config();

const express = require('express');
const app = express();

const infoRoute = require('./routes/info');
const apiRoutes = require('./routes/api');

const requestLogger = require('./middleware/requestLogger');
const unkownEndpoint = require('./middleware/unknownEndpoint');

const PORT = process.env.PORT;

app.use(express.static('../frontend/build'));
app.use(express.json());
app.use(requestLogger);

app.use(infoRoute);
app.use('/api', apiRoutes);

// Only called if no routes handle the request
app.use(unkownEndpoint);

app.listen(PORT, () => {
  console.log(`Live on http://localhost:${PORT}`);
});
