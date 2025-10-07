const express = require("express");
const blogsRouter = require("./controllers/blogs");
const app = express();
const config = require("./utils/config");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
