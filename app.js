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



// app.use(function(req, res, next){  
//   res.locals.username = req.body.username;
//   next();
// })
// app.get('/welcome', welcome);

app.use(function(req, res, next) {
  //console.log(req.session);
      res.locals.username = req.body.username;
      next(null,req,res);
  //   });
  // } else{
  //   next();
  // }
});
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(flash());

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
