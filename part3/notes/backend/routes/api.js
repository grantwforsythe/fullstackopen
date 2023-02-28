const express = require('express');
const router = express.Router();

const Note = require('../models/note');

router.get('/notes', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

router.post('/notes', async (request, response) => {
  if (!request.body.content) {
    return response.status(400).json({ error: 'Content missing' });
  }

  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
  });

  await note.save();

  response.json(note);
});

router.get('/notes/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);

    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

router.put('/notes/:id', async (request, response, next) => {
  try {
    const note = await Note.findByIdAndUpdate(
      request.params.id,
      { important: request.body.important },
      { new: true }       // Return the document after it's been updated
    );
    response.json(note);
  } catch (error) {
      next(error);
  }
});

router.delete('/notes/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end()
  } catch (error) {
    next(error);
  }
});

module.exports = router;
