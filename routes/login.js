var express = require('express');

var managerDao = require('../dao/ManagerDao');
var Manager = require('../models/Manager');

var router = express.Router(); //配置路由级别中间件

/* GET manager page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '重庆远华仪表有限公司' });
});

//login request
router.post('/',function(req,res,next){
	var account = req.body.account;
	var password = req.body.password;
	var manager = new Manager(account, password);
	managerDao.login(manager,function(err,result) {
		if (err) { return next(err); }
		if(!result){
			return next(err);
		}else if(result.password == password){
			req.session.manager = manager;
			return res.redirect('/manager?pageType=pro_check');
		}else{
			return res.redirect('/login');
		}
	});
});


module.exports = router;