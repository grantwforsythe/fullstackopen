const Blog = require('../models/blog');

const getAll = async (request, response) => {
  const blog = await Blog.find({});
  response.json(blog);
};

const addOne = async (request, response) => {
  const blog = await Blog.create(request.body);
  response.status(201).json(blog);
};

const getById = async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
};

const updateById = async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { ...request.body },
    { new: true, runValidators: true, context: 'query' }
  );

  response.json(blog);
};

const deleteById = async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
};

module.exports = {
  getAll,
  addOne,
  getById,
  updateById,
  deleteById,
};
