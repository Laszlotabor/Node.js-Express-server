const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the username "],
    },
    useremail: {
      type: String,
      required: [true, "Please add users contact email address "],
      unique: [true, "Address already registered!!!"]
    },
    password: {
      type: String,
      required: [true, "Please add the user password "],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel);