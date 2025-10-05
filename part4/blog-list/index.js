const app = require("./app");
const config = require("./utils/config");
const express = require("express");
const logger = require("./utils/logger");

app.use(express.json());

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
