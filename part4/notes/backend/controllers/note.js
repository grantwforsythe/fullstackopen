const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const Note = require('../models/note');
const User = require('../models/user');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.split(' ')[1];
  } else {
    return null;
  }
};

const getAll = async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  response.json(notes);
};

const addOne = async (request, response) => {
  const { content, important } = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), config.ACCESS_TOKEN);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  console.log(decodedToken);

  const user = await User.findById(decodedToken.id);

  const note = await Note.create({ content, important, user: user.id });
  // New notes are saved for a user
  user.notes = user.notes.concat(note._id);
  await user.save();

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
