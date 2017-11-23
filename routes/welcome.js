// jshint ignore: start
var express = require('express');
var router = express.Router();

router.get('/welcome',requireLogin, function(req, res, next) {
	res.render('welcome', {username: req.session.user.username});
});

function requireLogin (req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = router;