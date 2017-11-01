var express = require('express');
var fileDao = require("../dao/FileDao");
var router = express.Router();

/* GET download page. */
router.get('/*', function(req, res, next) {
	console.log("req.query : "+req.query);
	var pageType = req.query.pageType ? req.query.pageType : "产品资料";
	var pageNumber = req.body.pageNumber ? req.query.pageNumber : 1;
	fileDao.selectPage(pageType, pageNumber, function(err, type, result){
			if(err){ return next(err);}
			if(!result){
				return next(err);
			}else{
				console.log("req.query : "+result);
				res.render('download', { 
					title:'重庆远华仪表有限公司', 
					pageType: type,
					info: result
				});
			}
		});
});

module.exports = router;