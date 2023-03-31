const bcrypt = require('bcrypt');

const config = require('../utils/config');
const User = require('../models/user');

const getAll = async (request, response) => {
  const users = await User.find({}).select('username');
  response.json(users);
};

const addOne = async (request, response) => {
  const { username, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS);

  const user = await User.create({ username, name, passwordHash });

  response.status(201).json(user);
};

module.exports = { getAll, addOne };
