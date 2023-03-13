const express = require('express');
const router = express.Router();

const Note = require('../models/note');

router.get('', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

router.post('', async (request, response) => {
  const note = await Note.create({
    content: request.body.content,
    important: request.body.important,
  });

  response.status(201).json(note);
});

router.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

router.put('/:id', async (request, response) => {
  const note = await Note.findByIdAndUpdate(
    request.params.id,
    { important: request.body.important },
    {
      new: true, // Return the document after it's been updated
      runValidators: true, // Validate on update
      context: 'query',
    }
  );
  response.json(note);
});

router.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = router;
