require('dotenv').config();

const getURI = () => {
  switch (process.env.NODE_ENV) {
    case 'prod':
      return process.env.MONGODB_URI;
    case 'dev':
      return process.env.DEV_MONGODB_URI;
    case 'test':
      return process.env.TEST_MONGODB_URI;
    default:
      return process.env.DEV_MONGODB_URI;
  }
};

const { PORT } = process.env;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

const MONGODB_URI = getURI();

module.exports = {
  PORT,
  MONGODB_URI,
  SALT_ROUNDS,
};
