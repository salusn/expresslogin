var express = require('express');
var router = express.Router();
var session = require('express-session')
var bodyParser = require('body-parser');
const Joi = require('joi');
var i18n=require("i18n-express");
var flash = require('express-flash');
var cookieParser = require('cookie-parser');


var MongoClient = require('mongodb').MongoClient;
assert = require('assert');
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

	const schema = Joi.object().keys({
	firstname: Joi.string().required(),		
    lastname: Joi.string().required(),
    email: Joi.string().email()
    
});


	const result = Joi.validate({ firstname: req.body.firstname, lastname: req.body.lastname,email: req.body.email}, schema);
	console.log(result.error)
	 console.log(result.error.details)

	if (result.error) {
//req.flash('info', 'Your message goes here');
 //req.flash("messages", { "success" : "Sign Up Success" });
        //res.redirect("register");
    res.render('register', { errors: result.error.details });
   //return i18n.transform(result.errors);
   }

 
	// MongoClient.connect(url, function(err, db) {
	//   if (err) return
	// assert.equal(null, err);
	//   var collection = db.collection('formaction')
	//   collection.insert({firstname: firstname, lastname: lastname, email: email, number: number, username: username, password: password}, function(err, result) {
	//      if(result){
	//      	res.redirect('welcome')	 
	//      }
	//   })
	// })
});


module.exports = router;