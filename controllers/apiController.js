var request = require('request');

var apiController = {
	search: function(req, res) {
		var searchTerm = req.body.searchterm;
		request('http://api.usa.gov/recalls/search.json?query=' + searchTerm, function(error, response, body){
			if(!error && response.statusCode == 200) {
				var results = JSON.parse(body);
				res.send(results);
			}
		});
	}
};

module.exports = apiController;