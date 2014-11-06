var request = require('request');
var recollie = require('recollie');
var parser = require('xml2json');

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
			console.log(body)
			return body;
			}
		})
	}
};

module.exports = apiController;