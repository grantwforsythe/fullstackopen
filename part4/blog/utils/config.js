require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

module.exports = {
  PORT,
  MONGODB_URI,
  SALT_ROUNDS,
};
