// eslint-disable-next-line no-unused-vars
module.exports = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint',
    errorCode: 404,
  });
};
