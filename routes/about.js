var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: '重庆远华仪表有限公司' });
});

module.exports = router;
