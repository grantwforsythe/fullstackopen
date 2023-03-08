const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(result => console.log('Connected to MongoDB. Number of connetions: ', result.connections.length))
  .catch(error => console.log('Failed to connect to MongoDB. Error: ', error));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d+/.test(v);
      },
      message: props => `${props.value} is not a valid phone number`
    },
    required: [true, 'User phone number required']
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
