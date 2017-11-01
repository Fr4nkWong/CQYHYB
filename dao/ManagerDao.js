var dbc = require("../DBConnection");
var manager = require("../models/Manager");
var mysql = require('mysql');

var ManagerDao = {

  login:function(manager, callback){
  	var account = manager.mAccount;
    var values = [account];
    var sql="SELECT * FROM administor WHERE account = ?";
    dbc.exec(sql, values, function(err, rows){ 
      if(err){
        return callback(err);
      }
      //rows是一个对象数组
      console.log(rows[0]);
      callback(err, rows[0]);
    });
  },

  screen:function(pageType){
    var type = pageType;
    switch(pageType){
      case 'pro_check':
      type = "product";
      break;
      case 'doc_check':
      type = 'file';
      break;
      case 'new_check':
      type = 'news';
      break;
      case 'mes_check':
      type = 'message';
      break;
    }
    return type;
  },

  select:function(pageType, pageNumber, callback){
    var type = pageType;
    var table = ManagerDao.screen(type);
    console.log("[!!!]"+table);
    var num = (pageNumber-1)*10;
    var values = [num];
    var sql = "SELECT * FROM "+table+" LIMIT ?,12";
    dbc.exec(sql, values, function(err, rows){
      if(err){
        return callback(err);
      }
      //rows是一个对象数组
      callback(err, type, rows);
    });
  },

  filterInsert:function(pageType, object){
    var type = pageType;
    var obj = object;
    var sql = "";
    var values = [];
    var arr = [];
    switch(type){
      case 'pro_add':
      type = 'product';
      values = [obj.pId, obj.pName, obj.pImg, obj.pType1, obj.pType2, obj.pInfo, obj.pDate, obj.pImg1, obj.pImg2];
      sql = "INSERT INTO "+type+" VALUES (?,?,?,?,?,?,?,?,?)";
      break;
      case 'doc_add':
      type = 'file';
      values = [obj.fId, obj.fType, obj.fUrl, obj.fDate];
      sql = "INSERT INTO "+type+" VALUES (?,?,?,?)" ;
      break;
      case 'new_add':
      type = 'news';
      values = [obj.nId,obj.nTitle,obj.nType,obj.nContent, obj.nDate];
      sql = "INSERT INTO "+type+" VALUES (?,?,?,?,?)";
      break;
    }
    arr = [type, sql, values];
    return arr;
  },

  insert:function(pageType, object, callback){
    var type = pageType;
    var obj = object;
    var arr = ManagerDao.filterInsert(type, obj);
    var sql = arr[1];
    var values = arr[2];
    console.log("[!!!]"+type+":"+values[0]);
    dbc.exec(sql, values, function(err, rows){
      if(err){
        return callback(err);
      }
      //rows是一个对象数组
      console.log("[!!!]rows:"+rows);
      callback(err, type, rows[0]);
    });
  },

  delete:function(pageType, id, callback){
    var ID = id;
    var type = ManagerDao.screen(pageType);
    var values = [ID];
    console.log(values);
    var sql = "DELETE FROM "+type+" WHERE id = ?";
    dbc.exec(sql, values, function(err, rows){
      if(err){
        return callback(err);
      }
      //rows是一个对象数组
      console.log("[!!!]rows:"+rows);
      callback(err);
    });
  },

  pageNumber:function(pageType, callback){
    var type = ManagerDao.screen(pageType);
    var sql = "SELECT COUNT(*) as count FROM "+type;
    var values = [];
    console.log(sql);
    dbc.exec(sql, values, function(err, rows){
      if(err){
        return callback(err);
      }
      //rows是一个对象数组
      console.log("[!!!]rows:"+rows[0]);
      callback(err, rows);
    });
  }

};

module.exports = ManagerDao;