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
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

noteSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

module.exports = mongoose.model('Note', noteSchema);
