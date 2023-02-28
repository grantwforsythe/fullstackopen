const express = require('express');
const router = express.Router();

const Person = require('../models/person');

router.get('/persons', async (request, response) => {
  const persons = await Person.find({});
  response.json(persons);
});

router.post('/persons', async (request, response) => {
  const { name, number } = request.body;

  // Check that both variables exist
  if (name && number) {
    const inDB = await Person.find({ name: name });
    if (!inDB) {
      return response.status(400).json({
        error: 'name must be unique',
        errorCode: 400
      });
    }

    const person = new Person({
      name,
      number,
    });

    await person.save();

    response.json(person);
  } else {
    response.status(400).json({
      error: 'Name or number field missing',
      errorCode: 400
    });
  }
});

router.get('/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id);

    if (person) {
      response.json(person);
    } else {
      response.status(404).json({
        error: `No person found with an id of ${id}`,
        errorCode: 404
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findByIdAndUpdate(
      request.params.id,
      { number: request.body.number },
      { new: true}
    );

    response.json(person);
  } catch (error) {
    next(error);
  }
});

router.delete('/persons/:id', async (request, response, next) => {
  try {
    await Person.findByIdAndRemove(request.params.id);
    response.status(204).end()
  } catch (error) {
    next(error);
  }
});

module.exports = router;
