const { body } = require('express-validator');

const pizzaValidation = [
  body('name').trim().notEmpty().withMessage('Pizza name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('image').trim().notEmpty().withMessage('Image URL is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('isVeg').isBoolean().withMessage('isVeg must be a boolean'),
];

const ingredientValidation = [
  body('name').trim().notEmpty().withMessage('Ingredient name is required'),
  body('image').trim().notEmpty().withMessage('Image URL is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
];

const cartValidation = [
  body('name').trim().notEmpty().withMessage('Item name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const orderValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9]{10}$/)
    .withMessage('Enter a valid 10-digit phone number'),
  body('address').trim().notEmpty().withMessage('Delivery address is required'),
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('grandTotal').isFloat({ min: 0.01 }).withMessage('Grand total must be greater than 0'),
];

module.exports = { pizzaValidation, ingredientValidation, cartValidation, orderValidation };
