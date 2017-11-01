var express = require('express');
var fileDao = require("../dao/FileDao");
var router = express.Router();

/* GET download page. */
router.get('/*', function(req, res, next) {
	console.log("file's id: "+req.query.id);
	var id = req.query.id;
	fileDao.selectById(id, function(err, result){
		if(err){ return next(err);}
		if(!result){
			return next(err);
		}else{
			console.log(result[0].url);
			var url = "./upload/file/" + result[0].url;
			res.download(url);
		}
	});
});

module.exports = router;