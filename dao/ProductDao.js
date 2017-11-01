var dbc = require("../DBConnection");
var Product = require("../models/Product");
var mysql = require('mysql');

var ProductDao = {

	filter:function(type, num){
		var sql = "";
		var values = [];
		switch(type){
			case "all":
				sql = "SELECT id,name,img,(SELECT count(*) FROM product) as count FROM product LIMIT ?,12";
				values = [num];
				break;
			default:
				sql = "SELECT id,name,img,(SELECT count(*) FROM product) as count FROM product WHERE type2 = ? LIMIT ?,12";
				values = [type, num];
				break;
		}
		var arr = [sql, values];
		return arr;
	},

	select:function(type, page, callback){
		console.log(type+":"+page);
		var num = (page-1)*12;
		var arr = ProductDao.filter(type, num);
		var sql = arr[0];
		var values = arr[1];
		var type2 = type;
		dbc.exec(sql, values, function(err, rows){
			if(err){
				return callback(err);
			}
      //rows是一个对象数组
      console.log(rows);
      callback(err, type2, rows);
    });
	},

	selectOne:function(id, callback){
		console.log("id: "+id);
		var values = [id];
		var sql = "SELECT * FROM product WHERE id = ?";
		dbc.exec(sql, values, function(err, rows){
			if(err){
				return callback(err);
			}
      //rows是一个对象数组
      console.log(rows);
      callback(err, rows);
    });
	}

};

module.exports = ProductDao;
