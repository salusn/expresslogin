var express = require('express');
var router = express.Router();


router.get('/welcome', function(req, res, next) {
  res.render('welcome', { title: 'Welcome Here' });
});


module.exports = router;