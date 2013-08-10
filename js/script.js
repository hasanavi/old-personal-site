$(function(){
	//Docuemnt ready function 
	$('#menu li').click(function(){
		var page = $(this).attr('id');
		if((typeof page != 'undefined') && (page.length > 0)){
			$('#loader-anim').show();
			$('#loader-anim').css('width','100%');
			$.get('ajax-pages/'+page+'.html',function(res){
				$('#col-right').html(res);
				$('#loader-anim').hide();
				$('#loader-anim').css('width','0');
			});
		}else{
			$('#loader-anim').show();
			$('#loader-anim').css('width','100%');
			setTimeout(function(){
				$('#loader-anim').hide();
				$('#loader-anim').css('width','0');
			},500);
		}
	});
});