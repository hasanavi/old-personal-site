$(function(){
	//Docuemnt ready function 

	$(window).on("hashchange",(function hashHandler(e){
		var page = UTIL.getCleanHash().length == 0 ? 'home' : UTIL.getCleanHash();		
		showLoader();
		$.get('ajax-pages/'+page+'.html',function(res){
			$('#col-right').html(res);
			hideLoader();
		});
		
		return hashHandler;
	})());

	function showLoader () {
		$('#loader-anim').show();
		$('#loader-anim').css({'width':'100%','opacity':'1'});
	}

	function hideLoader () {
		setTimeout(function(){
			$('#loader-anim').hide();
			$('#loader-anim').css({'width':'0','opacity':'0'});
		},600);
	}
});