var express = require('express');
var router = express.Router();
var session = require('express-session')
var bodyParser = require('body-parser');
const Joi = require('joi');
var i18n=require("i18n-express");
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');


var MongoClient = require('mongodb').MongoClient;
assert = require('assert');
var url = 'mongodb://localhost:27017/formdb';

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register Here' });

});

router.post('/register', function(req, res) {

	const schema = Joi.object().keys({

		firstname: Joi.string().required(),		
	    lastname: Joi.string().required(),
	    email: Joi.string().email(),
	    phonenumber: Joi.number().integer().required(),
	    username: Joi.string().required(),
	    password: Joi.string().min(3).max(15).required(),
		confirmpassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
	});


	const result = Joi.validate({ firstname: req.body.firstname, lastname: req.body.lastname,email: req.body.email, phonenumber: req.body.number, username: req.body.username, password: req.body.password, confirmpassword: req.body.cpassword}, schema);

	if (result.error) {

    	res.render('register', { errors: result.error.details });
    } else { 
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
	        
	        	collection.find({'email':email }, function(err, user) {

		        if (user.length!=0) {
		              
		             var err = new Error();
		            err.status = "email:"  + email +", already exists";
					res.render('register', {messages: err.status});
		        } else{

					collection.insert({firstname: firstname, lastname: lastname, email: email, number: number, username: username, password: password}, function(err, result) {
				    	if(result){
				     		res.redirect('welcome')	 
				        }
				    })
		          }
	    	    })			  
		    })
	  }
});


module.exports = router;