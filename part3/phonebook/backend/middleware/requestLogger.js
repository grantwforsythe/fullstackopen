const morgan = require('morgan');

morgan.token('body', (request) => {
  return JSON.stringify(request.body);
});

module.exports = morgan(':method :url :status :res[content-length] - :response-time ms :body');
