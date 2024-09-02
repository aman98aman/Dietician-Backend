const mongoose = require('mongoose');

const planSchema = new mongoose.Schema([{
    name: { type: String },
    price: {type: Number}
}]);

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
