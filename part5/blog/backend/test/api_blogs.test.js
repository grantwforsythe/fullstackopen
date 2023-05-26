const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const listHelper = require('../utils/list_helper');
const config = require('../utils/config');

const Blog = require('../models/blog');
const User = require('../models/user');

const app = require('../app');

const api = supertest(app);

let token;

beforeAll(async () => {
  await User.deleteMany({});

  const username = 'root';
  const password = 'sAlAi9en!';
  const passwordHash = await bcrypt.hash(password, config.SALT_ROUNDS);

  await User.create({ username, passwordHash });

  const response = await api.post('/api/login').send({ username, password });
  token = response.body.token;
});

beforeEach(async () => {
  await Promise.all(listHelper.initialBlogs.map(blog => Blog.create(blog)));
});

afterEach(async () => {
  await Blog.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.disconnect();
});

describe('List helper', () => {
  test('Total number of likes', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const result = listHelper.totalLikes(response.body);
    expect(result).toBe(36);
  });

  test('Favourite blog', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const favouriteBlog = await Blog.findById('5a422b3a1b54a676234d17f9');

    const result = listHelper.favouriteBlog(response.body);
    expect(result).toEqual(favouriteBlog.toJSON());
  });

  test('Has id field', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('Creating blogs', () => {
  test('Create new blog and set default like value', async () => {
    const newBlog = {
      _id: '5a422a851b54a676634d17c5',
      title: 'Animal Farm',
      author: 'George Orwell',
      url: 'https://www.amazon.ca/Animal-Farm-George-Orwell/dp/0141036133',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    const addedBlog = response.body.find(blog => blog.title === newBlog.title);

    expect(addedBlog.likes).toEqual(0);
  });

  test('Fail to create blog if title is not present', async () => {
    const newBlog = {
      author: 'George Orwell',
      url: 'https://www.amazon.ca/Animal-Farm-George-Orwell/dp/0141036133',
      likes: 35,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('Fail to create blog if url is not present', async () => {
    const newBlog = {
      title: 'Animal Farm',
      author: 'George Orwell',
      likes: 35,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('Updating blogs', () => {
  test('Update one field in a blog', async () => {
    const blogId = '5a422a851b54a676234d17f7';
    const updatedTitle = { title: 'Notes From The Underground' };

    await api
      .put(`/api/blogs/${blogId}`)
      .send(updatedTitle)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get(`/api/blogs/${blogId}`);
    const updatedBlog = response.body;

    expect(updatedBlog).toMatchObject(updatedTitle);
  });

  test('Update multiple fields in a blog', async () => {
    const blogId = '5a422a851b54a676234d17f7';
    const updatedTitle = {
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      likes: 72,
    };

    await api
      .put(`/api/blogs/${blogId}`)
      .send(updatedTitle)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get(`/api/blogs/${blogId}`);
    const updatedBlog = response.body;

    expect(updatedBlog).toMatchObject(updatedTitle);
  });
});

describe('Deleting blogs', () => {
  test('Delete one blog', async () => {
    const newBlog = {
      title: 'Animal Farm',
      author: 'George Orwell',
      url: 'https://www.amazon.ca/Animal-Farm-George-Orwell/dp/0141036133',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const addedBlog = (await api.get('/api/blogs')).body.find(
      blog => blog.title === newBlog.title
    );

    await api
      .delete(`/api/blogs/${addedBlog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});
