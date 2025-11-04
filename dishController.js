// controllers/dishController.js
const Dish = require('../models/Dish');

// @desc    Get all dishes
// @route   GET /api/dishes
// @access  Public
exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error while fetching dishes' });
  }
};

// @desc    Get dish by ID
// @route   GET /api/dishes/:id
// @access  Public
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ msg: 'Dish not found' });
    }
    res.json(dish);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Dish not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};