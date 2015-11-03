// totally awesome jQuery! yay!

$(document).ready(function() {
	setVideoDimensions();
});

$(window).resize(function() {
	setVideoDimensions();
});

var setVideoDimensions = function() {
	var height = $(window).height() * 0.8;
	var width = height * (16/9);
	$('#video_player').height(height);
	$('#video_and_buttons .btn').height(height);
	$('#video_and_buttons .btn span').css('top', height/2);
	$('#video_player').width(width);
}