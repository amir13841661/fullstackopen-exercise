require("dotenv").config();
const mongoose = require("mongoose");

// const url = `mongodb+srv://amir13841661:${password}@test.rfnaazf.mongodb.net/?retryWrites=true&w=majority&appName=test`;
const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
