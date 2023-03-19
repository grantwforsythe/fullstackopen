module.exports = (error, request, response, next) => {
  switch (error.name) {
    case 'CastError':
      return response.status(400).json({ error: 'malformatted id' });
    case 'UnauthorizedError':
    case 'ValidationError':
      return response.status(400).json({ error: error.message });
    case 'JsonWebTokenError':
      return response.status(401).json({ error: 'invalid token' });
    case 'TokenExpiredError':
      return response.status(401).json({ error: 'token expired' });
    default:
      next(error);
  }
};
