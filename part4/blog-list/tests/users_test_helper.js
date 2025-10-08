const User = require("../models/user");

const initialUsers = [
  {
    username: "test",
    name: "test",
    id: "68e663619dc02d567f1ae35f",
    passwordHash: "testHash",
  },
  {
    username: "test1",
    name: "test1",
    id: "68e6a2f36f3b35268b934e79",
    passwordHash: "testHash",
  },
];

const usersInDataBase = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = { initialUsers, usersInDataBase };
