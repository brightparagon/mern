const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./mongodb/connection');
require('./mongodb/passport');
const routesApi = require('./routes/index');

const app = express();
app.locals.appTitle = 'mern-blog';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(function d(req, res, next) {
  res.locals.signedUser = req.session.user;
  next();
});
app.use('/', routesApi);

app.listen(app.get('port'), function() {
  console.info('Express server listening on port ' + app.get('port'));
});
