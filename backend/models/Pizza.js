const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Pizza name is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'] },
    image: { type: String, required: [true, 'Image URL is required'] },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be positive'] },
    ingredients: [{ type: String }],
    toppings: [{ type: String }],
    category: { type: String, default: 'classic' },
    isVeg: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pizza', pizzaSchema);
