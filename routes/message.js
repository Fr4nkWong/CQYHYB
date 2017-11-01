var express = require('express');

var Message = require('../models/Message');
var messageDao = require('../dao/messageDao');

var router = express.Router();

/* GET message page. */
router.get('/', function(req, res, next) {
  res.render('message', { title: '重庆远华仪表有限公司' });
});

/*handle message*/
router.post('/', function(req, res, next){
	//前端传来的数据是标准JSON，先解析为字符串再传化为对象取值
	var data = JSON.stringify(req.body);
	var obj = JSON.parse(data);
	console.log(obj);
	var name = obj.name;
	var phone = obj.phone;
	var email = obj.email;
	var content = obj.content;
	var message = new Message(name, phone, email, content, new Date());
	messageDao.insert(message, function(err, type, result){
		if(err){ 
			return next(err);
		}else{
			//直接以JSON形式装填数据转化为对象发了过去
			res.json({"msg":"感谢您的留言，留言已发送至后台！"});
		}
	});
	
});

module.exports = router;