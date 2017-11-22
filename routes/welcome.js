var express = require('express');
var router = express.Router();

router.get('/welcome', function(req, res, next) {
	//console.log(res.locals.username);

	res.render('welcome', { username: req.session.username});
});
module.exports = router;