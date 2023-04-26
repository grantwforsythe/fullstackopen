const Blog = require('../models/blog');
const User = require('../models/user');

const getAll = async (request, response) => {
  const blog = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blog);
};

const addOne = async (request, response) => {
  const { title, author, url, likes } = request.body;

  const user = await User.findById(request.auth.id);
  const blog = await Blog.create({
    title,
    author,
    url,
    likes,
    user: user.id,
  });
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
  const blog = await Blog.findById(request.params.id).where({
    user: request.auth.id,
  });

  if (blog) {
    await blog.delete();
    response.status(204).json({ message: `${blog.id} has been deleted` });
  }
};

module.exports = {
  getAll,
  addOne,
  getById,
  updateById,
  deleteById,
};
