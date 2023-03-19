const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const helper = require('./test_helper');
const Note = require('../models/note');
const User = require('../models/user');

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sAlAi9en!', 10);
  await User.create({ username: 'root', passwordHash });
});

beforeEach(async () => {
  // Transform all of the promises into one promise
  // Excutes the promises in parallel
  await Promise.all(helper.initialNotes.map(note => Note.create(note)));
});

afterEach(async () => {
  await Note.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all the notes are returned', async () => {
  const response = await api.get('/api/notes');

  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb();

  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(resultNote.body).toEqual(noteToView);
});

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(notesAtStart.length - 1);
});

test('a valid note can be added', async () => {
  const user = await helper.getUserByUsername('root');

  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
    userId: user.id,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/notes');
  const contents = response.body.map(note => note.content);

  expect(contents).toContain(newNote.content);
});

test('note without content is not added', async () => {
  const user = await helper.getUserByUsername('root');

  const newNote = {
    important: true,
    userId: user.id,
  };

  await api.post('/api/notes').send(newNote).expect(400);

  const notesInDb = await helper.notesInDb();
  expect(notesInDb).toHaveLength(helper.initialNotes.length);
});
