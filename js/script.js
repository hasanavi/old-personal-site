$(function(){
	//Docuemnt ready function 
	$('#menu li').click(function(){
		var page = $(this).attr('id');
		if((typeof page != 'undefined') && (page.length > 0)){
			$('#loader-anim').css('width','100%');
			$.get('ajax-pages/'+page+'.html',function(res){
				$('#col-right').html(res);
				$('#loader-anim').css('width','0');
			});
		}
	});
});