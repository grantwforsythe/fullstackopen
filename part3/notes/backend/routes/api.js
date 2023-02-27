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

router.get('/notes/:id', async (request, response) => {
  const note = await Note.findById(request.params.id) || {};
  response.json(note);
});

router.put('/notes/:id', async (request, response) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: request.params.id },
      { important: JSON.parse(request.body.important) },
      { new: true }       // Return the document after it's been updated
    );
    response.json(note);
  } catch (error) {
    response.status(500).json({ 
      error: 'There was a server side error updating the note',
      errorCode: 505,
    });
  }
});

router.delete('/notes/:id', async (request, response) => {
  try {
    await Note.findById(request.params.id).remove();
    response.status(204).end()
  } catch (error) {
    response.status(500).json({
      error: 'There was a server side error deleting the note',
      errorCode: 500
    });
  }
});

module.exports = router;
