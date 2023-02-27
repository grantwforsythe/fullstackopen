require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;

// const Note = require('./models/note');
const apiRoutes = require('./routes/api');

// Parse request bodies in JSON format
app.use(express.json());
// All requests from other origins
app.use(cors());
// Access the static files in the build directory
app.use(express.static('../frontend/build'));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Live on http://localhost:${PORT}`);
});
