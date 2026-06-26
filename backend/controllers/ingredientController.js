const Ingredient = require('../models/Ingredient');

const getIngredients = async (req,res) => {
    try {
        const ingredients = await Ingredient.find().sort({ createdAt: 1});
        res.json({ success: true, data: ingredients });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.create(req.body);
        res.status(201).json({ success: true, data: ingredient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { getIngredients, createIngredient };
