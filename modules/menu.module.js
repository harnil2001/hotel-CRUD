const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Menu name is required"] },
  description: {
    type: String,
    required: [true, "Menu description is required"],
  },
  is_drink: { type: Boolean, default: false },
  ingredients: {
    type: [String],
    required: [true, "Menu ingredients are required"],
  },
  price: { type: Number, required: [true, "Menu price is required"] },
  available: { type: Boolean, default: true },
  test: ["sweet","sour","spicy","bitter","umami"],  
});
const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
