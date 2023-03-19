module.exports = (error, request, response, next) => {
  switch (error.name) {
    case 'CastError':
      return response.status(400).send({ error: 'malformatted id' });
    case 'UnauthorizedError':
    case 'ValidationError':
    case 'JsonWebTokenError':
      return response.status(400).send({ error: error.message });
    default:
      next(error);
  }
};
