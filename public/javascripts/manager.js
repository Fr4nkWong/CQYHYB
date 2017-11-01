$(document).ready(function(){
	/*
  util
	*/
	function getQueryString(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  	var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
  	var context = ""; 
  	if (r != null) context = r[2]; 
  	reg = null; 
  	r = null; 
  	return context == null || context == "" || context == "undefined" ? "" : context; 
	}
  function tt(dd){
      //alert(dd);
  }
  var GG = {
      "kk":function(mm){
         // alert(mm);
      }
  };
  /*
  page init & left bar active
  */
  (function(window, $, getQueryString){
    var arr = ["pro_check","pro_add","doc_check","doc_add","new_check","new_add","mes_check"];
    var pageType = getQueryString("pageType");
    var pageNumber = getQueryString("pageNumber") ? getQueryString("pageNumber"):1;
    $(".sidebar li[data-type='"+pageType+"']").addClass('active');
    console.log("page init");
    $.ajax({
      type:"post",
      url:"/manager/page",
      data:{"pageType":pageType},
      dataType:"json",
      success:function(data){
        console.log(JSON.stringify(data));
        console.log("ok."+data.num.count+":"+pageNumber);
        var count = data.num.count ? data.num.count:1;
        $("#page").initPage(count, pageNumber, GG.kk);
      },
      error:function(err){
        console.log(err);
      }
    });
  })(window, $, getQueryString)
  /*
  delete option
  */
  $('#user_content').on('click', function(e){
  		if($(e.target).hasClass('del')){
  			console.log("enter del");
  			var pageType = getQueryString("pageType");
  			var id = $(e.target.parentNode.parentNode).attr('data-id');
  			console.log(pageType+":"+id);
  			$.ajax({
  				type:"post",
					url:"/manager/delete",
					dataType:"json",
					data:{"pageType":pageType,"id":id},
					success:function(data){
						alert(data.msg);
					},
					error:function(e){
						var a = JSON.stringify(e);
						console.log("error : "+a);
						alert('抱歉服务器出现了一点状况');
					}
  			});
  		}
    if($(e.target).attr('page-data')){
      var pageNumber = $(e.target).attr('page-data');
      var pageType = getQueryString("pageType");
      console.log("page change: "+pageNumber+","+pageType);
      if(!$(e.target).hasClass("pageItemDisable")){
        window.location.href="manager?pageType="+pageType+"&pageNumber="+pageNumber;
      }
    }
  });
  /*
  exit option
  */
  $('.exit').on('click', function(e){
    $.ajax({
      type:"post",
      url:"/manager/exit",
      dataType:"json",
      data:{},
      success:function(data){
        alert(data.msg);
      },
      error:function(e){
        var a = JSON.stringify(e);
        console.log("error : "+a);
        alert('抱歉服务器出现了一点状况');
      }
    });
  });

});