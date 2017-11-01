var mysql = require('mysql');

//配置SQL
var option = {
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '680523',
  database : 'cqyhyb'
};

var DBConnection = {

  //执行SQL
  exec:function(sqls, values, after) {
    var connection = mysql.createConnection(option);
    connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	  }
	  console.log('connected as id ' + connection.threadId);
	  connection.query(sqls || '', values || [], function(err, rows) {
	    after(err, rows);
	  });
	  //关闭数据库连接
	  connection.end();
    });
    connection.on('error', function(err) {
	  if (err.errno != 'ECONNRESET') {
	    after("err01", false);
	    throw err;
	  } else {
	    after("err02", false);
	  }
    });
  }

};

module.exports = DBConnection;