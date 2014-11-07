var Product = require('../models/product.js');
var User = require('../models/user.js');

var indexController = {
	index: function(req, res) {
		res.render('index', {
			user: req.user
		});
	},
	profile: function(req, res) {
		var findOneProfile = User.findOne({_id: req.user.id}).populate('products.product', '', 'product').exec(function(err, doc){
			console.log(doc);
			res.render('profile', {
				user: doc
			});
		});
	}
};

module.exports = indexController;