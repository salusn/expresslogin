var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/formdb';
var salt = bcrypt.genSaltSync(10);


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res) {
	 
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection('formaction');
		var username = req.body.username;
			password = req.body.password;
		function validateUserlogin(){
		return collection.findOne({username: username}).then(function(result){
			if(result != null) {
				 bcrypt.compare(password,result.password, function(err, doc){
				 	if(doc === true){
				 		console.log(req);
  						req.session.username = req.body.username;
  						console.log(req.session);
				 		res.redirect('welcome');	 
				 		//console.log(res);
				 	} else{
				 		res.render('login', {messages: "Invalid entry"});
				 	}
				 	
				 });
		} else{
			res.render('login', {messages: "Invalid entry"});
		}
			
		   });
		//return result
		}

		validateUserlogin(username).then(function(result) {


		});	
	});
});
module.exports = router;