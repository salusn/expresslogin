// jshint ignore: start
var express = require('express');
var router = express.Router();

router.get('/welcome',requireLogin, function(req, res, next) {
	console.log(req.session.user.username)
	res.render('welcome', {username: req.session.user.username});
});

function requireLogin (req, res, next) {
  if (!req.user) {
  	console.log("jjj")
    res.redirect('/login');
  } else {
  	console.log("sussess")
    next();
  }
};

module.exports = router;