const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    isVeg: { type: Boolean, default: true },
    isCustom: { type: Boolean, default: false },
    customIngredients: { type: Array, default: [] },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    fullName: { type: String, required: [true, 'Full name is required'], trim: true },
    phone: { type: String, required: [true, 'Phone number is required'], trim: true },
    address: { type: String, required: [true, 'Delivery address is required'], trim: true },
    items: [orderItemSchema],
    pizzaTotal: { type: Number, required: true, min: 0 },
    ingredientsTotal: { type: Number, required: true, min: 0 },
    grandTotal: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
