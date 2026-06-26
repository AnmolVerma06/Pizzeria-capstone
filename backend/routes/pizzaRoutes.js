const express = require('express');
const {
  getPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require('../controllers/pizzaController');
const validate = require('../middleware/validate');
const { pizzaValidation } = require('../middleware/validators');

const router = express.Router();

router.get('/', getPizzas);
router.get('/:id', getPizzaById);
router.post('/', pizzaValidation, validate, createPizza);
router.put('/:id', pizzaValidation, validate, updatePizza);
router.delete('/:id', deletePizza);

module.exports = router;
