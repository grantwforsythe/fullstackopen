const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');

/**
 * Sets the request.user property.
 */
module.exports = async (request, response, next) => {
  if (request.headers.authorization) {
    // e.g. 'Authorization Bearer ${token}'
    const token = jwt.verify(
      request.headers.authorization.split(' ')[1],
      config.ACCESS_TOKEN
    );

    if (token) {
      request.user = await User.findById(token.id);
    }
  }

  next();
};
