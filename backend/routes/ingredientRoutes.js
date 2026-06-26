const express = require('express');
const { getIngredients, createIngredient } = require('../controllers/ingredientController');
const validate = require('../middleware/validate');
const { ingredientValidation } = require('../middleware/validators');

const router = express.Router();

router.get('/', getIngredients);
router.post('/', ingredientValidation, validate, createIngredient);

module.exports = router;
