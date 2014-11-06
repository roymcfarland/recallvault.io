var indexController = {
	index: function(req, res) {
		res.render('index', {
			user: req.user
		});
	}
};

module.exports = indexController;