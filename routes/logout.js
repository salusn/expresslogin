var express = require('express');
var router = express.Router();


router.get('/logout',function(req,res){

req.session = null;

//req.session.destroy();	
//console.log(req.session);
res.redirect('/login');
});


module.exports = router;