const assert = require("node:assert");
const helper = require("./users_test_helper");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe("adding users", () => {
  test("invalid users won't be added", async () => {
    const usersAtStart = await helper.usersInDataBase();
    const newInvalidUser = { username: "1", name: "2", password: "1" };
    await api.post("/api/users").send(newInvalidUser).expect(400);
    const usersAtEnd = await helper.usersInDataBase();
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
