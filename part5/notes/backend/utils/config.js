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

const PORT = process.env.PORT;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const MONGODB_URI = getURI();

module.exports = {
  PORT,
  MONGODB_URI,
  SALT_ROUNDS,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
};
