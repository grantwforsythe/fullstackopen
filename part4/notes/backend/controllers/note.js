const Note = require('../models/note');

const getAll = async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
};

const addOne = async (request, response) => {
  const note = await Note.create({
    content: request.body.content,
    important: request.body.important,
  });

  response.status(201).json(note);
};

const getById = async (request, response) => {
  const note = await Note.findById(request.params.id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
};

const updatedById = async (request, response) => {
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
};

const deleteById = async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
};

module.exports = {
  getAll,
  addOne,
  getById,
  updatedById,
  deleteById,
};
