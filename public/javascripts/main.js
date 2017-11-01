$(document).ready(function(){
  /*PC nav*/
  $('.sub-menu').mousemove(function (e) {
  	$(this).find('li').css({"top":"-1.2rem","z-index":"1"});
  });
  $('.sub-menu').mouseleave(function (e) {
    $(this).find('li').css({"top":"-2rem","z-index":"-100"});
  });
    
  /*phone nav*/
  $('.nav-trigger').on('click', function(){
		if($('nav').hasClass('nav-active')){
		  $('nav').removeClass('nav-active');
		  $('nav').css({'height':'8em'});
		  $('nav ul').css({"display":"none"});
		  $('nav ul li').css({"display":"none"});
		}else{
			$('nav').addClass('nav-active');
			$('nav').css({'height':'65em'});
			$('nav ul').css('display','block');
			$('nav ul li').css({"display":"block"});
		}
  });
  
});