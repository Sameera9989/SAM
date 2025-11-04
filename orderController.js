// controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = [
  // Validation middleware
  body('items').isArray().withMessage('Items must be an array'),
  body('total').notEmpty().withMessage('Total is required'),
  body('paymentMethod').isString().withMessage('Payment method is required'),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, total, paymentMethod } = req.body;

    try {
      const newOrder = new Order({
        userId: req.user.id,
        items,
        total,
        paymentMethod,
        status: 'Preparing'
      });

      const order = await newOrder.save();
      res.status(201).json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error while creating order' });
    }
  }
];

// @desc    Get all orders for the logged-in user
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.dish', 'name price img')
      .sort({ createdAt: -1 }); // Latest first

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error while fetching your orders' });
  }
};

// @desc    Get order by ID (for tracking)
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('items.dish');

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};