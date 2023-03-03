const express = require('express');
const router = express.Router();

const Person = require('../models/person');

router.get('/persons', async (request, response) => {
  const persons = await Person.find({});
  response.json(persons);
});

router.post('/persons', async (request, response, next) => {
  try {
    const person = new Person({
      name: request.body.name,
      number: request.body.number,
    });

    await person.save();
    response.json(person);
  } catch (error) {
    next(error);
  }
});

router.get('/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id);

    if (person) {
      response.json(person);
    } else {
      response.status(404).json({
        error: `No person found with an id of ${request.params.id}`,
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
      { new: true }
    );

    response.json(person);
  } catch (error) {
    next(error);
  }
});

router.delete('/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findByIdAndRemove(request.params.id);
    console.log(person);
    response.status(204).json(person);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
