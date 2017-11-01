var express = require('express');
var router = express.Router();

var productDao = require('../dao/ProductDao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('instrument', { title: '重庆远华仪表有限公司' });
});

router.post('/select', function(req, res, next) {
	var data = JSON.stringify(req.body);
	var obj = JSON.parse(data);
	var type = obj.type;
	var page = obj.page;
	console.log(type+":"+page);
	productDao.select(type, page, function(err, type2, result){
		if(err){ return next(err);}
		if(!result){
			return next(err);
		}else{
			console.log("json: "+type2);
			res.json({"info": result, "type2": type2});
		}
	});
});

router.post('/selectOne', function(req, res, next) {
	var data = JSON.stringify(req.body);
	var obj = JSON.parse(data);
	var id = obj.id;
	console.log("id: "+id);
	productDao.selectOne(id, function(err, result){
		if(err){ return next(err);}
		if(!result){
			return next(err);
		}else{
			res.json({"info": result});
		}
	});
});

module.exports = router;
