var request = require('request');
var recollie = require('recollie');
var parser = require('xml2json');
var Product = require('../models/product.js');
var User = require('../models/user.js');
var mongoose = require('mongoose');

var apiController = {
	// Handler that uses Recollie to access federal government
	// REST API and return Page 1 of search results
	search: function(req, res) {
		var searchTerm = req.body.searchterm;
		recollie(searchTerm, function(results){
			var resultList = results.success;
			var listofResults = resultList.results;
			res.render('search', {
				results: listofResults
			});
		});
	},
	// Handler that scrapes data from federal government 
	// XML/RSS feed of updated recall notices and returns
	// it as JSON to command line on server side
	rssScraper: function(){
		request('http://api.usa.gov/recalls/recent.rss', function(error, response, body){
		if (!error && response.statusCode == 200) {
			var json = parser.toJson(body);
			console.log(json);
			}
		})
	},
	// Handler that adds new products
	// to a users library of products
	addProduct: function(req, res){
		// This came from the $.post on the client-side
		var productData = req.body;

		// Use the body of the post to build a
		// new Product document for MongoDB from
		// models/product.js Mongoose schema
		var newProduct = new Product(productData);

		// Saves the new Product document to the
		// collection in MongoDB
		newProduct.save(function(err, result){
			// When the save is completed,
			// send() back to the client the
			// object that was saved to the collection
			
			// console.log('Product saved:', result);
			req.user.products.push(result._id);
			req.user.save(function(err, doc){
				// console.log(doc)
				res.send(result);
			});
		});
	},
	removeProduct: function(req, res){
		// console.log('req.params.id', req.params.id);
		// console.log("req.user:", req.user);
		// console.log(new mongoose.Schema.Types.ObjectId(req.params.id));
		// var filtered = req.user.products.filter(function(productId){
		// 	console.log(productId.valueOf(), req.params.id);
		// 	return productId.toString() !== req.params.id;
		// });
		// console.log(req.user.products);
		// console.log(filtered);
		// req.user.products = filtered;
		// req.user.save(function(err, result){
		// 	res.send(err);
		// });
		User.update({_id: req.user._id}, {
			$pull: {products: req.params.id}},
			function(err, doc) {
				res.send(err)
			})
		// var productId = req.body.id;
		// var index = req.user.products.indexOf(productId);

		// req.user.products.splice(index, 1);
		// req.user.save(function(err, doc){
		// 	res.send.statusCode(200);
		// });
	}
};

// apiController.rssScraper();
// setInterval(apiController.rssScraper, 10000);

module.exports = apiController;