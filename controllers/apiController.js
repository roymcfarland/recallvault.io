var request = require('request');
var recollie = require('recollie');
var _ = require('underscore');

var apiController = {
	search: function(req, res) {
		var searchTerm = req.body.searchterm;
		recollie(searchTerm, function(results){
			var resultList = results.success;
			var listofResults = resultList.results;
			console.log(listofResults);
			res.render('search', {
				results: listofResults
			});
		});
	}
};

module.exports = apiController;