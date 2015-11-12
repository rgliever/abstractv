// totally awesome jQuery! yay!

$(document).ready(function() {
	setVideoDimensions();
	setFinishEvent();
	setCurrent();
	// setInterval(colorAnimation(), 3000);
});

$(window).resize(function() {
	setVideoDimensions();
});

var setVideoDimensions = function() {
	var width = $(window).innerWidth() * 0.7;
	var height = width * 9/16;
	$('#video_player').height(height);
	$('#video_and_buttons .btn').height(height);
	//$('#video_and_buttons .btn span').css('top', height/2);
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
		/*
		var split_url = window.location.href.split('/');
		var page_num = parseInt(split_url.pop(), 10);
		if (page_num + 1 < 45) {
			window.location.href = split_url.join('/') + '/' + (++page_num);
		}
		*/
		nextId();
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

var colors = [
	'rgb(250, 0, 50)',
	'rgb(250, 250, 50)',
	'rgb(0, 250, 50)',
	'rgb(0, 50, 250)',
	'rgb(150, 0, 250)'
];

var colorAnimation = function() {
	var i = Math.floor(Math.random() * (colors.length-1));
	$('#logo').animate({ color: colors[i] }, Math.floor(Math.random() * 10000) + 3000, 
	function() {
		setInterval(colorAnimation(), 500);
	});
}

// Video indexing
var index = 0;

var nextId = function() {
	index = index == 44 ? 0 : index + 1;
	updateView();
}

var prevId = function() {
	index = index == 0 ? 44 : index - 1;
	updateView();
}

/* jsonData is set to be the passed in json in the layout view */
var updateView = function() {
	var url = 'https://player.vimeo.com' + jsonData[index].uri.replace(/videos/, 'video') +
						'?api=1&player_id=video_player&autoplay=1&color=9600FA';
	$('#video_player').attr('src', url);
	$('#video_title a').attr("href", jsonData[index].link);
	$('#video_title a').text(jsonData[index].name);
}