const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Ingredient name is required'], trim: true },
    image: { type: String, required: [true, 'Image URL is required'] },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be positive'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ingredient', ingredientSchema);
