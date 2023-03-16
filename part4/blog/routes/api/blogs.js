const express = require('express');

const router = express.Router();

const Blog = require('../../models/blog');

router.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post('/', async (request, response) => {
  const blog = await Blog.create(request.body);
  response.status(201).json(blog);
});

router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

router.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { ...request.body },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  response.json(blog);
});

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = router;
