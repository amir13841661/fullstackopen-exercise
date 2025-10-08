const User = require("../models/user");

const initialUsers = [
  {
    username: "test",
    name: "test",
    password: "test",
  },
  {
    username: "test1",
    name: "test1",
    password: "test1",
  },
];

const usersInDataBase = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = { initialUsers, usersInDataBase };
