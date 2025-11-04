// models/Dish.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true }, // e.g., "$12.99"
  img: { type: String, required: true },
  ingredients: [String],
  desc: String,
  cuisine: String,
  restaurantId: Number,
});

module.exports = mongoose.model('Dish', dishSchema);