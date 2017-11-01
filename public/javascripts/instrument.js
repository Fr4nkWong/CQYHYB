$(document).ready(function(){
	/*
	分页初始化
	*/
	function tt(dd){
	    //alert(dd);
	}
	var GG = {
	    "kk":function(mm){
	       // alert(mm);
	    }
	};

	function renderTable(data){
		var info = data;
		var $row1 = $(".row1");
		var $row2 = $(".row2");
		var $row3 = $(".row3");
		var $row4 = $(".row4");
		var inner1 = "";
		var inner2 = "";
		var inner3 = "";
		var inner4 = "";
		var baseUrl = "products/";
		var i = 0;
		$row1.empty();
		$row2.empty();
		$row3.empty();
		$row4.empty();
		for(i;i<info.length;i++){
			if(i<=2 && i>=0){
				inner1 += "<div class='pro-item' data-id='"+info[i].id+"'><div class='avatar-wrapper'><img class='avatar' src='"+baseUrl+info[i].id+"/"+info[i].img+"' /></div><span class='pro-name'>名称："+info[i].name+"</span></div>";
			}
			if(i>=3 && i<=5){
				inner2 += "<div class='pro-item' data-id='"+info[i].id+"'><div class='avatar-wrapper'><img class='avatar' src='"+baseUrl+info[i].id+"/"+info[i].img+"' /></div><span class='pro-name'>名称："+info[i].name+"</span></div>";
			}
			if(i>=6 && i<=8){
				inner3 += "<div class='pro-item' data-id='"+info[i].id+"'><div class='avatar-wrapper'><img class='avatar' src='"+baseUrl+info[i].id+"/"+info[i].img+"' /></div><span class='pro-name'>名称："+info[i].name+"</span></div>";
			}
			if(i>=9 && i<=11){
				inner4 += "<div class='pro-item' data-id='"+info[i].id+"'><div class='avatar-wrapper'><img class='avatar' src='"+baseUrl+info[i].id+"/"+info[i].img+"' /></div><span class='pro-name'>名称："+info[i].name+"</span></div>";
			}
		}
		$row1.html(inner1);
		$row2.html(inner2);
		$row3.html(inner3);
		$row4.html(inner4);
	}

	function selectType(type, page){
		$.ajax({
			type:"post",
			url:"/instrument/select",
			dataType:"json",
			data:{"type":type,"page":page},
			success:function(data){
				console.log("总页数："+JSON.stringify(data.info));
				console.log("总页数："+data.info[0].count);
				console.log("信息类别："+data.type2);
				renderTable(data.info);
				var num = data.info[0].count ? data.info[0].count:1;
				var count = num%12>0 ? Math.floor(num/12)+1 : (num/12);
				if(page === 1){
					$("#page").initPage(num,1,GG.kk);
					$('#page').attr('data-type', data.type2);
					$('#page').attr('data-count', count);
				}
			},
			error:function(e){
				var a = JSON.stringify(e);
				console.log("error : "+a);
			}
		});
	}

	function selectOne(id){
		$.ajax({
			type:"post",
			url:"/instrument/selectOne",
			dataType:"json",
			data:{"id":id},
			success:function(data){
				console.log(data);
				$(".avatar").attr({ src: "products/"+id+"/"+data.info[0].img});
				$(".detail-name p").html(data.info[0].name);
				$(".detail-info p").html(data.info[0].info);
				$(".pro-wrapper").css({'display':'none'});
  			$(".detail-wrapper").css({'display':'block'});
			},
			error:function(e){
				var a = JSON.stringify(e);
				console.log("error : "+a);
			}
		});
	}

	$(".submenu li").on("click", function(e){
		var type = $(this.childNodes[0]).text();
		selectType(type, 1);
	});

  /*close the details*/
  $(".detail-back").on("click", function(e){
  	$(".detail-wrapper").css({'display':'none'});
  	$(".pro-wrapper").css({'display':'block'});
  	$(".detail-name p").empty();
		$(".detail-info p").empty();
  });

  /*open the details*/
  $(".pro-table").on("click", function(e){
  	if($(e.target).hasClass('pro-item')){
  		var id = $(e.target).attr('data-id');
  		selectOne(id);
  	}
  	if($(e.target).hasClass('avatar')){
  		var id = $(e.target.parentNode.parentNode).attr('data-id');
  		selectOne(id);
  	}
  	if($(e.target).hasClass('pro-name')){
  		var id = $(e.target.parentNode).attr('data-id');
  		selectOne(id);
  	}
  });

  $("#page").on("click", function(e){
  	var page = $(e.target).attr('page-data');
  	var count = $(this).attr('data-count');
  	var type = $(this).attr('data-type');
  	if(!$(e.target).hasClass("pageItemDisable")){
  		console.log("page click "+type+":"+page);
  		selectType(type, page);
  	}
  });

  /*init page*/
	selectType("all", 1);

});
