var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/formdb';

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;