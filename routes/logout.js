var express = require('express');
var router = express.Router();


router.get('/logout',function(req,res){
	
req.session.username = null;
console.log(req.session.username);
res.redirect('/login');
});


module.exports = router;