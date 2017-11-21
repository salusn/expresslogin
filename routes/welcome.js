var express = require('express');
var router = express.Router();

router.get('/welcome', function(req, res, next) {
	//console.log(sess.username);
res.render('welcome', { username: req.session.username});
});
module.exports = router;