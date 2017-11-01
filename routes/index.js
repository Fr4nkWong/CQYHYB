var express = require('express');
var router = express.Router(); //配置路由级别中间件

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '重庆远华仪表有限公司' });
});


module.exports = router;