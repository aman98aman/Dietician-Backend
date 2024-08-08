
const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    itemName: {
        type: String,
    },
    calories:{
        type: Number
    },
    detail:[{
        NutritionName: String,
        amount: Number
    }]
})

const nutritionModal = mongoose.model('Nutrition', nutritionSchema);

module.exports = nutritionModal;