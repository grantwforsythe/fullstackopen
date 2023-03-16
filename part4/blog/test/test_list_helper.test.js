const mongoose = require('mongoose');
const supertest = require('supertest');

const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Promise.all(listHelper.initialBlogs.map(blog => Blog.create(blog)));
});

afterEach(async () => {
  await Blog.deleteMany({});
});

afterAll(async () => {
  await Blog.deleteMany({});
  mongoose.disconnect();
});

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
      .expect(201)
      .expect('Content-Type', /application\/json/);

    newBlog.likes = 0;
    // Rename the '_id' field to 'id'
    // eslint-disable-next-line no-underscore-dangle
    delete Object.assign(newBlog, { id: newBlog._id })._id;

    const response = await api.get('/api/blogs');

    expect(response.body).toContainEqual(newBlog);

    const addedBlog = response.body.find(
      blog => blog.id === '5a422a851b54a676634d17c5'
    );

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
