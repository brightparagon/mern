var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./mongodb/connection');
require('./mongodb/passport');
var routesApi = require('./routes/index');

var app = express();
app.locals.appTitle = "mern-blog";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});
app.use('/', routesApi);

app.listen(app.get('port'), function() {
  console.info('Express server listening on port ' + app.get('port'));
});
