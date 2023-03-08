const totalLikes = blogs => {
  const reducer = (total, blog) => total + blog.likes;

  return blogs.reduce(reducer, 0);
};

const favouriteBlog = blogs => {
  const reducer = (blog1, blog2) => (blog1.likes > blog2.likes ? blog1 : blog2);

  return blogs.reduce(reducer);
};

module.exports = {
  totalLikes,
  favouriteBlog,
};
