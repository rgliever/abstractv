// totally awesome jQuery! yay!

$(document).ready(function() {
	setVideoDimensions();
	setFinishEvent();
	setCurrent();
});

$(window).resize(function() {
	setVideoDimensions();
});

var setVideoDimensions = function() {
	var width = $(window).innerWidth() * 0.75;
	var height = width * 9/16;
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
		if (page_num + 1 < 45) {
			window.location.href = split_url.join('/') + '/' + (++page_num);
		}
	}
}

// Sets the current channel in the dropdown to be active
var setCurrent = function() {
	var path = window.location.pathname;					// e.g. /exp/0
	var stub_path = '/' + path.split('/')[1];			// e.g. /exp

	$('.dropdown-menu li').each(function() {
		var href = $(this).children().attr('href');	// e.g. /exp
		if (href == stub_path) {
			$(this).toggleClass('active');
		}
	});
}