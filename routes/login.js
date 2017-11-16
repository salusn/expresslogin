var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/formdb';

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res) {
	console.log("hhhh")
	res.redirect('welcome')	 
})
module.exports = router;