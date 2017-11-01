$(document).ready(function(e) {
	/*tab plugin*/
   $(".tab li").click(function(){
		$(".tab li").eq($(this).index()).addClass("activ").siblings().removeClass("activ");
		$(".tab_content div").hide().eq($(this).index()).show();
	});
});
