const express = require('express');
const cors = require('cors');
const app = express();

// Parse request bodies in JSON format
app.use(express.json());
// All requests from other origins
app.use(cors());
// Access the static files in the build directory
app.use(express.static('build'));

let notes = [
  {
    content: "HTML is easy",
    important: true,
    id: 1,
  },
  {
    content: "Browser can execute only JavaScript",
    important: false,
    id: 2,
  },
  {
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
    id: 3,
  }
];

app.get('/', (request, response) => {
  response.send('<h1>Hello, World!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0;
    return maxId + 1;
};

app.post('/api/notes', (request, response) => {
  if (!request.body.content) {
    return response.status(400).json({ error: 'Content missing' });
  }

  const note = {
    content: request.body.content,
    important: request.body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).json({
      error: `No note found with an id of ${id}`,
      errorCode: 404
    });
  }
});

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.map(note => {
    return note.id === id
      ? { ...note, important: !note.important, }
      : note;
  });

  response.json(notes.find(note => note.id === id));
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end()
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Live on http://localhost:${PORT}`);
});
