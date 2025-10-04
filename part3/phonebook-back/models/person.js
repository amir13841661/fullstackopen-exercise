require("dotenv").config();
const mongoose = require("mongoose");

// const url = `mongodb+srv://amir13841661:${password}@test.rfnaazf.mongodb.net/?retryWrites=true&w=majority&appName=test`;
const url = process.env.MONGODB_URL;

const phoneValidator = function (phone) {
  const phoneRegex = /^\d{2,3}-\d{5,}$/;

  return phoneRegex.test(phone);
};

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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 3,
    required: true,
    validate: {
      validator: phoneValidator,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
