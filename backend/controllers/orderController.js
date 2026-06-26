const Order = require('../models/Order');
const Cart = require('../models/Cart');

const generateOrderNumber = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `PIZ-${random}`;
};

const createOrder = async (req, res) => {
  try {
    const { fullName, phone, address, items, pizzaTotal, ingredientsTotal, grandTotal } = req.body;

    if (!fullName || !phone || !address) {
      return res.status(400).json({ success: false, message: 'All billing fields are required' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty. Cannot place order.' });
    }

    if (grandTotal <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid order total' });
    }

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      fullName,
      phone,
      address,
      items,
      pizzaTotal,
      ingredientsTotal,
      grandTotal,
    });

    await Cart.deleteMany({});

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, getOrders };
