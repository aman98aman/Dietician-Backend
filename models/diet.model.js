const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema([{
    name: { type: String },
    description: {type: String},
    categories: { type: Object }
}]);

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
