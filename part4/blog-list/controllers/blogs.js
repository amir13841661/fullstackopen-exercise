const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const user = request.user;
  const blog = new Blog({ ...request.body, user: user.id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (!blog.user.toString() === user.id.toString()) {
    response.status(403).json({ error: "unauthorized user" });
  }
  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});
blogsRouter.put("/:id", async (request, response) => {
  const newLikesValue = request.body.likes;

  const result = await Blog.findByIdAndUpdate(request.params.id, {
    likes: newLikesValue,
  });
  response.status(200).end();
});

module.exports = blogsRouter;
