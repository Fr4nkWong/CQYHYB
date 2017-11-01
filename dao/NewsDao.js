var dbc = require("../DBConnection");
var New = require("../models/New");
var mysql = require('mysql');

var NewsDao = {

	select:function(pageType, pageNumber, callback){
		var type = pageType;
		console.log("type : "+type);
		var num = (pageNumber-1)*10;
		var values = [num];
		/*var sql = "SELECT * FROM news WHERE type = ? LIMIT ?,10";*/
		var sql = "SELECT id,title,type,date FROM news";
		dbc.exec(sql, values, function(err, rows){
			if(err){
				return callback(err);
			}
      //rows是一个对象数组
      console.log(rows);
      callback(err, type, rows);
    });
	},

	selectOne:function(id, callback){
		var sql = "SELECT * FROM news WHERE id = ?";
		var values = [id];
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

module.exports = NewsDao;