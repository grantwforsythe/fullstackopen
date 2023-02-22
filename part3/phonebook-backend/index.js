const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;
const MAX_ID = 1000000;

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const generateId = () => {
  return Math.floor(Math.random() * MAX_ID);
};

app.get('/info', (request, response) => {
  const timeRecived = new Date();
  response.send(`
    Phonebook has info for ${persons.length} people
    ${timeRecived.toLocaleString('en-US', {timeZone: 'America/New_York'})} EST
  `);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  // Check that both variables exist
  if (name && number) {
    if (persons.find(person => person.name === name)) {
      return response.status(400).json({
        error: 'name must be unique',
        errorCode: 400
      });
    }

    const person = {
      id: generateId(),
      name,
      number,
    };

    persons = persons.concat(person);

    response.json(person);
  } else {
    response.status(400).json({
      error: 'Name or number field missing',
      errorCode: 400
    });
  }
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).json({
      error: `No person found with an id of ${id}`,
      errorCode: 404
    });
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Live on http://localhost:${PORT}`);
});
