var express = require('express');
var router = express.Router();
var validator = require('express-validator');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/formdb';

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register Here' });
});

router.post('/register', function(req, res) {


	// var firstname = req.body.firstname;
	// 	lastname = req.body.lastname;
	// 	email = req.body.email;
	// 	number = req.body.number;
	// 	username = req.body.username;
	// 	password = req.body.password;
	// 	cpassword = req.body.cpassword;

		req.body(firstname, 'firstname is required').notEmpty();
		// req.checkBody('lastname', 'lastname is required').notEmpty();
		// req.checkBody('email', 'email is required').notEmpty();
		// req.checkBody('email', 'Email does not appear to be valid').isEmail();
		// req.checkBody('username', 'Email is required').notEmpty();
		// req.checkBody('password', 'password is required').notEmpty();
		// req.checkBody('cpassword', 'cpassword is required').notEmpty();
		
		res.redirect('welcome');

        
	// MongoClient.connect(url, function(err, db) {
	//   if (err) return
	// assert.equal(null, err);
	//   var collection = db.collection('formdata')
	//   collection.insert({firstname: firstname, lastname: lastname}, function(err, result) {

	//      if(result){
	//      	res.redirect('success')
	 
	//      }
	//   })
	// })
});


module.exports = router;