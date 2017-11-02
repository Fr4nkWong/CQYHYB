var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var util = require('util');
var multiparty = require('multiparty');
/*"multer": "^1.3.0",*/

var managerDao = require('../dao/ManagerDao');
var New = require('../models/New');
var Product = require('../models/Product');
var File = require('../models/File');
/*var upload = multer({ dest: 'upload/' });*/

var router = express.Router(); //config router middleware

//handle the left bar request
router.get('/*', function(req, res, next) {
	console.log("[!!!]"+JSON.stringify(req.session));
	if(req.session.manager){
		var arr = ["pro_check","doc_check","new_check","mes_check"];
		var type = req.query.pageType ? req.query.pageType:arr[0];
		var pageNumber = req.query.pageNumber ? req.query.pageNumber:1;
		if(arr.indexOf(type) != -1){
			managerDao.select(type, pageNumber, function(err, type, result){
				if(err){ return next(err);}
				if(!result){
					return next(err);
				}else{
					res.render('manager', { 
						title:'重庆远华仪表有限公司', 
						pageType: type,
						info: result
					});
				}
			});
		}else{
			res.render('manager',{title:'重庆远华仪表有限公司', pageType: type});
		}
	}else{
		return res.redirect('/login');
	}

});

/*handle add new*/
router.post('/new_add', function(req, res, next){
	var type = "new_add";
	var new_id = parseInt(req.body.new_id);
	var new_title = req.body.new_title;
	var new_type = req.body.new_type;
	console.log("new_type : "+new_type);
	var new_content = req.body.new_content;
	var news = new New(new_id, new_title, new_type, new_content, new Date());
	managerDao.insert(type, news, function(err, type, result){
		if(err){ 
			return next(err);
		}else{
			return res.redirect('/manager?pageType=new_check');
		}
	});
});

/*handle add product*/
router.post('/pro_add', function(req, res, next){
	var type = "pro_add";
	var form = new multiparty.Form({uploadDir: './public/products/'});
	console.log(req.body);
	console.log(req.files);
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files,null,2);
		var fieldsTmp = JSON.stringify(fields,null,2);
		if(err){
			next(err);
		}else{
			console.log("fields : "+fieldsTmp);
			console.log('parse files: ' + filesTmp);
			var pro_id = fields.pro_id;
			var pro_name = fields.pro_name;
			var pro_info = fields.pro_info ? fields.pro_info:" ";
			var pro_type1 = fields.pro_type1;
			var pro_type2 = fields.pro_type2 ? fields.pro_type2:pro_type1;
			var pro_pic = files.pro_pic[0];
			var pro_pic1 = files.pro_pic1[0];
			var pro_pic2 = files.pro_pic2[0];
			console.log("pro_pic1+pro_pic2: ");
			console.log(pro_pic1);
			console.log(pro_pic2);
			var uploadedPath = pro_pic.path;
			var baseUrl = `./public/products/${pro_id}/`;
			if(!fs.existsSync(baseUrl)){
				fs.mkdirSync(baseUrl);
      }
			var dstPath = `./public/products/${pro_id}/${pro_pic.originalFilename}`;
			fs.renameSync(uploadedPath, dstPath);
			if(pro_pic1.originalFilename){
				var uploadedPath1 = pro_pic1.path;
				var dstPath1 = `./public/products/${pro_id}/${pro_pic1.originalFilename}`;
				var uploadedPath2 = pro_pic2.path;
				var dstPath2 = `./public/products/${pro_id}/${pro_pic2.originalFilename}`;
				fs.renameSync(uploadedPath1, dstPath1);
				if(pro_pic2.originalFilenames){
					fs.renameSync(uploadedPath2, dstPath2);
				}else{
					fs.unlinkSync(uploadedPath2);
				}
			}else{
				fs.unlinkSync(pro_pic1.path);
				fs.unlinkSync(pro_pic2.path);
			}
			var product = new Product(pro_id, pro_name, pro_pic.originalFilename, pro_type1, pro_type2, pro_info, new Date(), pro_pic1.originalFilename, pro_pic2.originalFilename);
			managerDao.insert(type, product, function(err, type, result){
				if(err){ 
					return next(err);
				}else{
					return res.redirect('/manager?pageType=pro_check');
				}
			});
		}
	});	
});

/*handle add doc*/
router.post('/doc_add', function(req, res, next){
	var type = "doc_add";
	var form = new multiparty.Form({uploadDir: './upload/'});
	console.log("req.body : "+req.body);
	console.log("req.files : "+req.files);
	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files,null,2);
		var fieldsTmp = JSON.stringify(fields,null,2);
		if(err){
			next(err);
		}else{
			console.log("fields : "+fieldsTmp);
			console.log('parse files: ' + filesTmp);
			var doc_id = fields.doc_id;
			var doc_type = fields.doc_type;
			var inputFile = files.doc_upload[0];
			var uploadedPath = inputFile.path;
			var dstPath = './upload/file/' + inputFile.originalFilename;
			fs.rename(uploadedPath, dstPath, function(err) {
				if(err){
					next(err);
				}else{
					console.log('rename ok');
				}
			});
			var file = new File(doc_id, doc_type, inputFile.originalFilename, new Date());
			managerDao.insert(type, file, function(err, type, result){
				if(err){
					return next(err);
				}else{
					return res.redirect('/manager?pageType=doc_check');
				}
			});
		}
	});
});

/*handle delete option*/
router.post('/delete', function(req, res, next){
	var data = JSON.stringify(req.body);
	var obj = JSON.parse(data);
	console.log(obj);
	var pageType = obj.pageType;
	var id = obj.id;
	managerDao.delete(pageType, id, function(err){
		if(err){ 
			return next(err);
		}else{
			//直接以JSON形式装填数据转化为对象发了过去
			res.json({"msg":"已删除"});
		}
	});
});

/*handle delete option*/
router.post('/page', function(req, res, next){
	var data = JSON.stringify(req.body);
	var obj = JSON.parse(data);
	var pageType = obj.pageType;
	managerDao.pageNumber(pageType, function(err, result){
		if(err){ 
			return next(err);
		}else{
			res.json({"num": result[0]});
		}
	});
});

/*handle detail option*/
router.post('/check', function(req, res, next){
	var data = JSON.stringify(req.body);
	var obj = JSON.parse(data);
	var pageType = obj.pageType;
	var id = obj.id;
	console.log(obj);
	managerDao.check(pageType, id, function(err, result){
		if(err){ 
			return next(err);
		}else{
			res.json({"result": result[0]});
		}
	});
});

/*handle exit option*/
router.post('/exit', function(req, res, next){
	console.log("exit option");
	req.session.manager = null;
	res.json({"msg":"已注销"});
});

module.exports = router;