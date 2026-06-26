const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} = require('../controllers/cartController');
const validate = require('../middleware/validate');
const { cartValidation } = require('../middleware/validators');

const router = express.Router();

router.get('/', getCart);
router.post('/', cartValidation, validate, addToCart);
router.put('/:id', updateCartItem);
router.delete('/clear', clearCart);
router.delete('/:id', deleteCartItem);

module.exports = router;
