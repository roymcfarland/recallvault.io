var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// Controllers
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/apiController.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.get('/', indexController.index);
app.post('/search', apiController.search);

var server = app.listen(7398, function() {
	console.log('Express server listening on port ' + server.address().port);
});