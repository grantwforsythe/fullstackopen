const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../utils/config');
const User = require('../models/user');

module.exports = async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const payload = {
    username: user.username,
    id: user._id,
  };

  // The token expires in 60 * 60 seconds = 1 hour
  const token = jwt.sign(payload, config.ACCESS_TOKEN, { expiresIn: 60 * 60 });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
};
