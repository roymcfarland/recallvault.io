var express = require('express');
var bodyParser = require('body-parser');

// Access federal government RESTful API
var request = require('request');
var recollie = require('recollie');

// Database persistence
var mongoose = require('mongoose');

// Create cookies to keep track of user(s)
// across multiple pages
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport.js');

// Controllers
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/apiController.js');
var authenticationController = require('./controllers/authentication.js');

// Database connection
mongoose.connect('mongodb://localhost/recallVault');

// Express setup
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser());

app.use(cookieParser());
app.use(flash());

// Initialize the express session
app.use(session({secret: 'secret'}));

// Hook passport into middleware chain
app.use(passport.initialize());
app.use(passport.session());

app.get('/', indexController.index);
app.post('/search', apiController.search);
app.get('/auth/login', authenticationController.login);
app.post('/auth/login', authenticationController.processLogin);
app.post('/auth/signup', authenticationController.processSignup);

// ***** IMPORTANT ***** //
// Prevents unauthorized access to any route handler defined
// after this call to .use()
app.use(passportConfig.ensureAuthenticated);

app.get('/profile', indexController.profile);
app.post('/api/addProduct', apiController.addProduct);
app.get('/auth/logout', authenticationController.logout);


var server = app.listen(7398, function() {
	console.log('Express server listening on port ' + server.address().port);
});