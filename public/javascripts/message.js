$(document).ready(function(){
	$('#submit').on('click', function(e){
    e.preventDefault();
		var name = $('#vname').val();
		var email = $('#vmail').val();
		var phone = $('#vnumber').val();
		var content = $('#vcontent').val();
		$.ajax({
			type:"post",
			url:"/message",
			dataType:"json",
			data:{"name":name,"email":email,"phone":phone,"content":content},
			success:function(data){
				alert(data.msg);
			},
			error:function(e){
				var a = JSON.stringify(e);
				console.log("error : "+a);
			}
		});
	});

});