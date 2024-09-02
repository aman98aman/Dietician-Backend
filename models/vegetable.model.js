const mongoose = require('mongoose');

const vegSchema = new mongoose.Schema([{
    name: { type: String },
}]);

const vegModal = mongoose.model('vegModal', vegSchema);

module.exports = vegModal;
