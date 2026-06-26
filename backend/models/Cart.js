const mongoose = require('mongoose');

const customIngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    pizzaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza', default: null },
    name: { type: String, required: [true, 'Item name is required'] },
    quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'], default: 1 },
    price: { type: Number, required: true, min: [0, 'Price must be positive'] },
    image: { type: String, default: '' },
    isVeg: { type: Boolean, default: true },
    isCustom: { type: Boolean, default: false },
    customIngredients: [customIngredientSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
