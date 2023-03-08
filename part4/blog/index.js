const express = require('express');
const cors = require('cors');

const app = express();
const config = require('./utils/config');
const blogsRouter = require('./routes/api/blogs');

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
