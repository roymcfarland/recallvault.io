var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
	manufacturer: String
});

module.exports = mongoose.model('product', productSchema);