// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');

// Create order
router.post('/', auth, async (req, res) => {
  const { items, total, paymentMethod } = req.body;

  try {
    const newOrder = new Order({
      userId: req.user.id,
      items,
      total,
      paymentMethod
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's orders
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.dish');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;