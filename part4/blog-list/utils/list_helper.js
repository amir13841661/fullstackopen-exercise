const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

const mostBlogs = (blogs) => {
  if (blogs.length == 0) {
    return {};
  }
  const authorWithMostBlogs = _(blogs)
    .groupBy("author")
    .map((blogs, author) => ({
      author,
      blogs: blogs.length,
    }))
    .maxBy("blogs");
  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  if (blogs.length == 0) {
    return {};
  }
  const authorWithMostLikes = _(blogs)
    .groupBy("author")
    .map((blogs, author) => ({
      author,
      totalLikes: _.sumBy(blogs, "likes"),
    }))
    .maxBy("totalLikes");

  return authorWithMostLikes;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
