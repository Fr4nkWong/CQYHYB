var express = require('express');
var router = express.Router();

var newsDao = require('../dao/NewsDao');

/* GET home page. */
router.get('/*', function(req, res, next) {
	var id = req.query.id;
	newsDao.selectOne(id, function(err, result){
		if(err){ return next(err);}
		if(!result){
			return next(err);
		}else{
			res.render('article', { info: result[0]});
		}
	});
});

module.exports = router;
