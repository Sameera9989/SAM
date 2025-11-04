// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
      quantity: Number,
    }
  ],
  total: String, // "$24.99"
  status: { type: String, default: 'Preparing', enum: ['Preparing', 'Out for Delivery', 'Delivered'] },
  paymentMethod: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);