const jwt = require('jsonwebtoken');
const bcrytp = require('bcrypt');

const config = require('../utils/config');
const User = require('../models/user');

module.exports = async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const isPasswordCorrect =
    user === null ? false : await bcrytp.compare(password, user.passwordHash);

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const payload = { username: user.username, id: user.id };
  const token = jwt.sign(payload, config.ACCESS_TOKEN, { expiresIn: 60 * 60 });

  return response.status(200).send({ token });
};
