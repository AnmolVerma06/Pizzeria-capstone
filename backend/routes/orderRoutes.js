const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const validate = require('../middleware/validate');
const { orderValidation } = require('../middleware/validators');

const router = express.Router();

router.get('/', getOrders);
router.post('/', orderValidation, validate, createOrder);

module.exports = router;
