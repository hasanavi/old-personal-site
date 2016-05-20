(function(){

	//$(function() {
		var $surveyContainer = $('.survey-container'),
			cssFile = 'embed-style.css',
			img = new Image(),
			position = $surveyContainer.data('pos');

		img.src = 'survey-img.png';
		img.alt = "click here for survey";
			
		$surveyContainer.addClass(position);

		$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', cssFile) );

		$surveyContainer.find('.survey-container__link').html(img);
	//});

})();