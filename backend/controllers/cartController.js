const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    const items = await Cart.find().populate('pizzaId').sort({ createdAt: 1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { pizzaId, name, quantity, price, image, isVeg, isCustom, customIngredients } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ success: false, message: 'Name and price are required' });
    }

    const qty = quantity || 1;
    if (qty < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    if (pizzaId && !isCustom) {
      const existing = await Cart.findOne({
        pizzaId: pizzaId,
        isCustom: false,
      });
      if (existing) {
        existing.quantity += qty;
        await existing.save();
        return res.status(200).json({ success: true, data: existing });
      }
    }

    const item = await Cart.create({
      pizzaId: pizzaId || null,
      name,
      quantity: qty,
      price,
      image: image || '',
      isVeg: isVeg !== undefined ? isVeg : true,
      isCustom: isCustom || false,
      customIngredients: customIngredients || [],
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity !== undefined && quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    const item = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const item = await Cart.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
