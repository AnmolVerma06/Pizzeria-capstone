const Pizza = require('../models/Pizza');

const getPizzas = async (req, res) => {
  try {
    const { search, isVeg } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (isVeg !== undefined && isVeg !== '') {
      filter.isVeg = isVeg === 'true';
    }

    const pizzas = await Pizza.find(filter).sort({ createdAt: 1 });
    res.json({ success: true, data: pizzas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ success: false, message: 'Pizza not found' });
    }
    res.json({ success: true, data: pizza });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPizza = async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);
    res.status(201).json({ success: true, data: pizza });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pizza) {
      return res.status(404).json({ success: false, message: 'Pizza not found' });
    }
    res.json({ success: true, data: pizza });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizza) {
      return res.status(404).json({ success: false, message: 'Pizza not found' });
    }
    res.json({ success: true, message: 'Pizza deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
};
