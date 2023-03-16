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

module.exports = router;
