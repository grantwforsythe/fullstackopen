require('dotenv').config();

const getURI = () => {
  switch (process.env.NODE_ENV) {
    case 'prod':
      return process.env.MONGODB_URI;
    case 'dev':
      return process.env.MONGODB_DEV_URI;
    case 'test':
      return process.env.MONGODB_TEST_URI;
    default:
      return process.env.MONGODB_DEV_URI;
  }
};

const { PORT, ACCESS_TOKEN } = process.env;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

const MONGODB_URI = getURI();

module.exports = {
  PORT,
  ACCESS_TOKEN,
  MONGODB_URI,
  SALT_ROUNDS,
};
