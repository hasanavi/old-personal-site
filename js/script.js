$(function(){
	//Docuemnt ready function 
	$('#menu li').click(function(){
		var page = $(this).attr('id');
		if((typeof page != 'undefined') && (page.length > 0)){
			showLoader();
			$.get('ajax-pages/'+page+'.html',function(res){
				$('#col-right').html(res);
				hideLoader();
			});
		}else{
			showLoader();
			hideLoader();			
		}
	});

	function showLoader () {
		$('#loader-anim').show();
		$('#loader-anim').css('width','100%');
	}

	function hideLoader () {
		setTimeout(function(){
				$('#loader-anim').hide();
				$('#loader-anim').css('width','0');
		},500);
	}
});