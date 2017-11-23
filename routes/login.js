// jshint ignore: start
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
			var hash = bcrypt.hashSync(password, salt);

		collection.findOne({username: username}, function(err, user) {

			if(!user){
				res.render('login', {messages: "Invalid username or password"});
			} else{
				bcrypt.compare(password,user.password, function(err, result){
					if(result == true) {
						req.session.user = user;
						res.redirect('welcome');	 

					} else{
						res.render('login', {messages: "Invalid username or password"});
					}
					
				});
			}
        });	
	});
});
module.exports = router;