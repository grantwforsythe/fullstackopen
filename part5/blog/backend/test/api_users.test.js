import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '../utils/config';
import User from '../models/user';
import app from '../app';

const api = request(app);

beforeEach(async () => {
  await User.deleteMany({});

  const username = 'root';
  const password = 'sAlAi9en!';
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  await User.create({ username, passwordHash });
});

afterAll(async () => {
  mongoose.disconnect();
});

describe('User', () => {
  test('Fail to created user if username is less than 3 characters', async () => {
    const newUser = {
      username: 'gr',
      name: 'Grant',
      password: 'sAlAi9en!',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toMatch(
      'Username must be at least 3 characters'
    );
  });

  test('Fail to created user if username is more than 16 characters', async () => {
    const newUser = {
      username: 'grgrgrgrgrgrgrgrgrgr',
      name: 'Grant',
      password: 'sAlAi9en!',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toMatch(
      'Username must be no more than 16 characters'
    );
  });

  test('Fail to create user if username is not unique', async () => {
    const newUser = { username: 'root', password: 'sAlAi9en!' };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toMatch('Expected username to be unique');
  });
});
