const assert = require("node:assert");
const helper = require("./test_helper");
const userhelper = require("./users_test_helper");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
  for (user of userhelper.initialUsers) {
    await api.post("/api/users").send(user);
  }
});

describe("getting blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("has id property", async () => {
    const blogs = await helper.blogsInDataBase();
    // console.log(blogs);

    assert(Object.hasOwn(blogs[0], "id"));
    assert(!Object.hasOwn(blogs[0], "_id"));
  });
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });
});

describe("adding new blogs", async () => {
  let token;

  beforeEach(async () => {
    const sampleUser = userhelper.initialUsers[0];
    const response = await api
      .post("/api/login")
      .send({ username: sampleUser.username, password: sampleUser.password });
    token = response.body.token;
  });

  test("new valid blog can be added", async () => {
    const newBlog = {
      title: "testing post",
      author: "test",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };

    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsAtEnd = await helper.blogsInDataBase();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    const authors = blogsAtEnd.map((n) => n.author);
    assert(authors.includes("test"));
  });

  test("blog without right body are not added", async () => {
    const newBlog = {};

    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDataBase();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });
  test("likes default to zero if not given", async () => {
    const newBlog = {
      title: "testing post",
      author: "test",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };
    await api
      .post("/api/blogs")
      .set("authorization", `Bearer ${token}`)
      .send(newBlog);
    const blogsAtEnd = await helper.blogsInDataBase();

    const [addedBlog] = await blogsAtEnd.filter(
      (blog) => blog.author === "test"
    );

    assert.strictEqual(addedBlog.likes, 0);
  });
  test("fails when no token given", async () => {
    const newBlog = {
      title: "testing post",
      author: "test",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDataBase();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDataBase();

    const titles = blogsAtEnd.map((n) => n.title);
    assert(!titles.includes(blogToDelete.title));

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  });
});

describe("updating existing blogs data", () => {
  test("updates the likes of the given blog", async () => {
    const blogsAtStart = await helper.blogsInDataBase();
    const blogToUpdate = blogsAtStart[0];
    const newLikesValue = 200;
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: newLikesValue })
      .expect(200);
    const blogsAtEnd = await helper.blogsInDataBase();

    const [updatedBlog] = blogsAtEnd.filter((u) => u.id === blogToUpdate.id);

    assert.strictEqual(updatedBlog.likes, newLikesValue);
  });
});

describe("adding users", () => {
  test("invalid users won't be added", async () => {
    const usersAtStart = await userhelper.usersInDataBase();
    const newInvalidUser = { username: "1", name: "2", password: "1" };
    await api.post("/api/users").send(newInvalidUser).expect(400);
    const usersAtEnd = await userhelper.usersInDataBase();
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
