$(document).ready(function(e) {
	/*初始化*/
	/*$.ajax({
		type:"post",
		url:"/download/init",
		dataType:"json",
		data:"pageType="+"产品资料"+"&pageNum="+1,
		success:function(data){},
		error:function(){
			alert("fuck download");
		}
	});*/
	/*侧边栏加载*/
	/*(function(window,$,getQueryString){
		var arr = ['产品资料','产品说明','产品明细'];
		var arr1 = ['file_data','file_instruction','file_detail'];
		var pageType = getQueryString("pageType");
		console.log(pageType);
		var pageType = arr1[arr.indexOf(pageType)];
		console.log(pageType);
		$(".tab li").removeClass('activ');
		$(".tab li[data-type='"+pageType+"']").addClass('activ');
	})(window,$,function(name){ 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  	var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
  	var context = ""; 
  	if (r != null) context = r[2]; 
  	reg = null; 
  	r = null; 
  	return context == null || context == "" || context == "undefined" ? "产品资料" : context; 
  })*/
	$(".tab li").click(function(){
		$(".tab li").eq($(this).index()).addClass("activ").siblings().removeClass("activ");
		$(".tab_content div").hide().eq($(this).index()).show();
		var pageType = $(this).text();
		console.log(pageType);
		//window.location.href="/download?pageType="+pageType;
	});

});