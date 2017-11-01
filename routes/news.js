var express = require('express');

var newsDao = require("../dao/NewsDao");

var router = express.Router();

/* GET news page. */
router.get('/*', function(req, res, next) {
  console.log("req.query : "+req.query);
	var pageType = req.query.pageType ? req.query.pageType : "企业新闻";
	var pageNumber = req.body.pageNumber ? req.query.pageNumber : 1;
	newsDao.select(pageType, pageNumber, function(err, type, result){
			if(err){ return next(err);}
			if(!result){
				return next(err);
			}else{
				console.log("result: "+result);
				res.render('news', { 
					title:'重庆远华仪表有限公司', 
					pageType: type,
					info: result
				});
			}
		});
});

module.exports = router;