const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "User name is required"] },
  email: { type: String, required: [true, "email is required"] },
  password: { type: String, required: [true, "Password is required"] },
  role: {
    type: String,
    enum: ["waiter", "chef", "manager", "user"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
