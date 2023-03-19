require('dotenv').config();

const PORT = process.env.PORT;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  PORT,
  MONGODB_URI,
  SALT_ROUNDS,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
};
