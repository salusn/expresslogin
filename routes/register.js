var express = require('express');
var router = express.Router();
var session = require('express-session')
var bodyParser = require('body-parser');

var validator = require('express-validator');
var MongoClient = require('mongodb').MongoClient;
assert = require('assert');
var url = 'mongodb://localhost:27017/formdb';

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register Here' });

});

router.post('/register', function(req, res) {

   req.checkBody('firstname', 'Firstname is required').notEmpty();
   req.checkBody('lastname', 'Lastname is required').notEmpty();
   req.checkBody('email', 'Email is required').notEmpty();
   req.checkBody("email", "Enter a valid email address.").isEmail();
   req.checkBody('number', 'Phone Number is required').notEmpty();
   req.check(  
  "number",
  "Contestant count must be a number and one that is divisible by 2"
).isNumber().isDivisibleBy(2);
   req.checkBody('username', 'Username is required').notEmpty();
   req.checkBody('password', 'Password is required').notEmpty();
   req.checkBody('cpassword', 'Confirm password is required').notEmpty();
   req.checkBody('cpassword', 'Passwords do not match').equals(req.body.password);

   var errors = req.validationErrors();
  if (errors) {
     res.render('register', { errors: errors });
    return;
  } 

	var firstname = req.body.firstname;
		lastname = req.body.lastname;
		email = req.body.email;
		number = req.body.number;
		username = req.body.username;
		password = req.body.password;
		cpassword = req.body.cpassword;

 
	MongoClient.connect(url, function(err, db) {
	  if (err) return
	assert.equal(null, err);
	  var collection = db.collection('formaction')
	  collection.insert({firstname: firstname, lastname: lastname, email: email, number: number, username: username, password: password}, function(err, result) {
//console.log(result);
	     if(result){
	     	//req.session.firstname = firstname;
	     	console.log(req)
	     	res.redirect('welcome')	 
	     }
	  })
	})
});


module.exports = router;