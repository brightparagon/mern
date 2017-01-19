var express = require('express');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./mongodb/connection');
var routesApi = require('./routes/index');
var app = express();
app.locals.appTitle = "mern-blog";

// set views folder where ejs template files are stored
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routesApi);

// development error handler
// print stacktrace
if (app.get('env') === 'development') {
  app.use(function(error, req, res, next) {
    res.status(error.status || 500);
    res.render('error', {
      message: error.message,
      error: error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(error, req, res, next) {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message,
    error: {}
  });
});

app.listen(app.get('port'), function() {
  console.info('Express server listening on port ' + app.get('port'));
});
