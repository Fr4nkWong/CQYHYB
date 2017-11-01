var dbc = require("../DBConnection");
var message = require("../models/Message");
var mysql = require('mysql');

var MessageDao = {

	insert:function(message, callback){
		var msg = message;
		var values = [msg.mName, msg.mPhone, msg.mEmail, msg.mContent, msg.mDate];
		var sql = "INSERT INTO message VALUES (null,?,?,?,?,?)";
		dbc.exec(sql, values, function(err, rows){
      if(err){
        return callback(err);
      }
      //rows是一个对象数组
      console.log("[!!!]rows:"+rows);
      callback(err, rows[0]);
    });
	},

	delete:function(){}

};

module.exports = MessageDao;