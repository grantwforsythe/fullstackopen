const bcrypt = require('bcrypt');

const config = require('../utils/config');
const User = require('../models/user');

const checkPassword = password => {
  if (!password.match(/[a-z]+/)) {
    return 'Must contain at least one lowercase character';
  } else if (!password.match(/[A-Z]+/)) {
    return 'Must contain at least one uppercase character';
  } else if (!password.match(/[0-9]+/)) {
    return 'Must contain at least one digit';
  } else if (!password.match(/[@#$!%&]/)) {
    return 'Must contain at least one special character, e.g. !';
  } else {
    return '';
  }
};

const getAll = async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
  });
  response.json(users);
};

const addUser = async (request, response) => {
  const { username, name, password } = request.body;

  const isValidPassword = checkPassword(password);
  if (isValidPassword.length > 0) {
    response.status(400).json({ error: isValidPassword });
  }

  const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS);

  const user = await User.create({
    username,
    name,
    passwordHash,
  });

  response.status(201).json(user);
};

module.exports = { getAll, addUser };
