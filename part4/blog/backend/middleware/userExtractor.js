const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../controllers/user');

/**
 * Sets the request.user property.
 */
module.exports = async (request, response, next) => {
  if (request.cookies.token) {
    const token = jwt.verify(request.cookies.token, config.ACCESS_TOKEN);

    if (token) {
      request.user = await User.findById(token.id);
    }
  }

  next();
};
