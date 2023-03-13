const mongoose = require('mongoose');

const config = require('../utils/config');
const logger = require('../utils/logger');

mongoose.set('strictQuery', false);

mongoose
  .connect(config.MONGODB_URI)
  .then(result =>
    logger.log(`Connected to: ${result.connections[0].name} collection`)
  )
  .catch(error => logger.error('Failed to connect to MongoDB. Error: ', error));

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
  },
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
