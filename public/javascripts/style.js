// totally awesome jQuery! yay!

$(document).ready(function() {
	setVideoDimensions();
	setFinishEvent();
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

// go to next video when the last one finishes
var setFinishEvent = function() {
	var iframe = $('#video_player')[0];
	var player = $f(iframe);

	player.addEvent('ready', function() {
		player.addEvent('finish', onFinish);
	})

	function onFinish(id) {
		console.log('Video finished!!!');
		var split_url = window.location.href.split('/');
		var page_num = parseInt(split_url.pop(), 10);
		if (page_num + 1 < 30) {
			window.location.href = split_url.join('/') + '/' + (++page_num);
		}
	}
}