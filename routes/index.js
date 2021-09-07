var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/Terms_Conditions', function(req, res, next) {
  res.render('Terms_Conditions');
});

module.exports = router;
