var express = require('express');
var router = express.Router();
var session = require('express-session')

var validator = require('express-validator');
router.use(validator())
var MongoClient = require('mongodb').MongoClient;
assert = require('assert');
var url = 'mongodb://localhost:27017/formdb';

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register Here' });
});

router.post('/register', function(req, res) {


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