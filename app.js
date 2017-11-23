// jshint ignore: start
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const Joi = require('joi'); 
var i18n=require("i18n-express");
var flash = require('express-flash');
var session = require('express-session');
var flash = require('connect-flash');
const bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/formdb';

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var register = require('./routes/register');
var welcome = require('./routes/welcome');
var logout = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  resave: false,
  saveUninitialized: true,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  secure: true,
  ephemeral: true
}));
app.use(flash());

app.use(function(req, res, next) {
 
  if (req.session && req.session.user) {
    MongoClient.connect(url, function(err, db) {
    var collection = db.collection('formaction');
     collection.findOne({ username: req.session.user.username }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      next();
     });
   });
  } else {
     next();
  }

});


app.use('/', index);
app.use('/users', users);

app.get('/register', register);
app.get('/login', login);
app.get('/welcome', welcome);
app.get('/logout', logout);

app.post('/register',register);
app.post('/login',login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
