const User = require('../controllers/user');

/**
 * Sets the request.user property.
 */
module.exports = async (request, response, next) => {
  request.user = await User.findById(request.auth.id);
  next();
};
