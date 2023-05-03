/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const config = require('../utils/config');

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [3, 'Username must be at least 3 characters, got {VALUE}'],
    maxLength: [16, 'Username must be no more than 16 characters'],
    unique: true,
    required: true,
  },
  name: String,
  passwordHash: {
    type: String,
    minLength: [3, 'Must be at least of length 3, got {VALUE}'],
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.plugin(uniqueValidator, {
  message: 'Expected username to be unique',
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model('User', userSchema);
