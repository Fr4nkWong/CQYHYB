var dbc = require("../DBConnection");
var file = require("../models/File");
var mysql = require('mysql');

var FileDao = {

	selectPage:function(pageType, pageNumber, callback){
		var type = pageType;
		console.log("type : "+type);
		var num = (pageNumber-1)*10;
		var values = [num];
		/*var values = [type, num];*/
		/*var sql = "SELECT * FROM file WHERE type = ? LIMIT ?,10";*/
		var sql = "SELECT * FROM file LIMIT ?,10";
		dbc.exec(sql, values, function(err, rows){
			if(err){
				return callback(err);
			}
      //rows是一个对象数组
      console.log(rows);
      callback(err, type, rows);
    });
	},

	selectById:function(id, callback){
    var values = [id];
    console.log(id);
    var sql = "SELECT * FROM file WHERE id = ?";
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

module.exports = FileDao;