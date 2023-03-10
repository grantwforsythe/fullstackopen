const mongoose = require('mongoose');

const listHelper = require('../utils/list_helper');

const Blog = require('../models/blog');

const arrayOfBlogs = [
  new mongoose.Types.ObjectId('6408fcc73331b166324408ea'),
  new mongoose.Types.ObjectId('6408fce83331b166324408ec'),
  new mongoose.Types.ObjectId('6408fcff3331b166324408ee'),
  new mongoose.Types.ObjectId('6408fd173331b166324408f0'),
  new mongoose.Types.ObjectId('6408fd2b3331b166324408f2'),
  new mongoose.Types.ObjectId('6408fd3f3331b166324408f4'),
];

test('Total number of likes', async () => {
  const blogs = await Blog.find({ _id: { $in: arrayOfBlogs } });

  const result = listHelper.totalLikes(blogs);
  expect(result).toBe(36);
});

test('Favourite blog', async () => {
  const blogs = await Blog.find({ _id: { $in: arrayOfBlogs } });
  const favouriteBlog = await Blog.findById('6408fcff3331b166324408ee');

  const result = listHelper.favouriteBlog(blogs);
  expect(result).toEqual(favouriteBlog);
});

afterAll(() => {
  mongoose.disconnect();
});
