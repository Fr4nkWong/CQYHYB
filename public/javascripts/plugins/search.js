(function($) {
$.expr[":"].Contains = function(a, i, m) {														//自定义伪类选择器:Contains
	return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};
function filterList(header, list) {
	//@header 头部元素
	//@list 无序列表
	//创建一个搜素表单
	var form = $("<form>").attr({
		"class":"filterform",
		action:"#"
	}), input = $("<input>").attr({
		"class":"filterinput",
		type:"text"
	});
	$(form).append(input).appendTo(header);						
	$(input).change(function() {														
		var filter = $(this).val();																
		if (filter) {
			$matches = list.find(".submenu").find("a:Contains(" + filter + ")").parent();		//二级li
			$("li", list).not($matches).slideUp();		
			$matches.parent().parent().slideDown();
			$matches.slideDown();																
		} else {
			$(list).find("li").slideDown();														
		}
		return false;
	}).keyup(function() {
		$(this).change();																		
	});
}
$(function() {
	filterList($("#search"), $("#menu_list"));													//调用搜索插件
	$("#menu_list li").click(function(){
		$("#menu_list li.active").removeClass("active")
		$(this).addClass("active");
	});
});
})(jQuery);	