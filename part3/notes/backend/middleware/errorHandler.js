module.exports = (error, request, response, next) => {
  console.log(error.message);

  switch (error.name) {
    case 'CastError':
      return response.status(400).send({ error: 'malformatted id' });
    case 'ValidationError':
      return response.status(400).send({ error: error.message });
    default:
      next(error);
  }
};
