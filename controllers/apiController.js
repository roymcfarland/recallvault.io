var request = require('request');
var recollie = require('recollie');
var parser = require('xml2json');
var Product = require('../models/product.js');
var User = require('../models/user.js');

var apiController = {
	search: function(req, res) {
		var searchTerm = req.body.searchterm;
		recollie(searchTerm, function(results){
			var resultList = results.success;
			var listofResults = resultList.results;
			// console.log(listofResults);
			res.render('search', {
				results: listofResults
			});
		});
	},
	rssScraper: function(){
		request('http://api.usa.gov/recalls/recent.rss', function(error, response, body){
		if (!error && response.statusCode == 200) {
			var json = parser.toJson(body);
			console.log(json);
			}
		})
	},
	// POST Handler for adding new tracks
	// to our collection. Assume that the
	// body of our request has the proper
	// fields to create a new Music() item.
	addProduct: function(req, res){
		// This came from the $.post on the client-side
		var productData = req.body;
		console.log('productData:', productData);

		// Use the body of the post to build a
		// new Music document
		var newProduct = new Product(productData);
		console.log('newProduct:', newProduct);

		// Save the new Product document to the
		// collection
		newProduct.save(function(err, result){
			// When the save is completed,
			// send() back to the client the
			// object that was saved to the collection.
			console.log('Product saved:', result);
			// res.send(result);

			req.user.products.push(result._id);
			req.user.save(function(err, doc){
				console.log(doc)
				// console.log(err)
				res.redirect('/profile');
			});
		});
	}
};

// apiController.rssScraper();
// setInterval(apiController.rssScraper, 10000);

module.exports = apiController;