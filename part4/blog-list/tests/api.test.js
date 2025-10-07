const assert = require("node:assert");
const helper = require("./test_helper");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("new valid blog can be added", async () => {
  const newBlog = {
    title: "testing post",
    author: "test",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogsAtEnd = await helper.blogsInDataBase();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  const authors = blogsAtEnd.map((n) => n.author);
  assert(authors.includes("test"));
});

test("blog without right body is not added", async () => {
  const newBlog = {};

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDataBase();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});
test("has id property", async () => {
  const blogs = await helper.blogsInDataBase();
  // console.log(blogs);

  assert(Object.hasOwn(blogs[0], "id"));
  assert(!Object.hasOwn(blogs[0], "_id"));
});
test("likes default to zero if not given", async () => {
  const newBlog = {
    title: "testing post",
    author: "test",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };
  await api.post("/api/blogs").send(newBlog);
  const blogsAtEnd = await helper.blogsInDataBase();

  const [addedBlog] = await blogsAtEnd.filter((blog) => blog.author === "test");

  assert.strictEqual(addedBlog.likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});
