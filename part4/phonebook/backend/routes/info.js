const express = require('express');
const router = express.Router();

const Person = require('../models/person');

router.get('/info', async (request, response) => {
  const timeRecived = new Date();
  const persons = await Person.find({});
  response.send(`
    Phonebook has info for ${persons.length} people
    ${timeRecived.toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
  `);
});

module.exports = router;
