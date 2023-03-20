const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);
let token = '';

describe('Creating users', () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const username = 'root';
    const password = 'sAlAi9en!';
    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ username, passwordHash });

    const response = await api.post('/login').send({ username, password });
    token = response.body.token;
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sAlAi9en!',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sAlAi9en!',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
