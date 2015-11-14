// initial setup and routing stuff
var express = require('express');
var router = express.Router();
var https = require('https');
var async = require('async');

// VIMEO API STUFF
//var CLIENT_ID = 'b4760bed5e4deb04e2153e81d5c573a738bb6085';
//var CLIENT_SECRET = 'ltaQMGVW9XVm8727xBDYb2pVHNk46/zTwWaNP2ZzZlYS3Y6idGrqrFv4Oag2XERkCAm7efp83lpT6pwcXIDLfBBWTk35t3I6ISyRRWkZuuVchfdAVU0AxYQzEZu47W2E'
//var ACCESS_TOKEN = 'a285411f565d45e3cdbed7b5ab924d4b';
var Vimeo = require('vimeo').Vimeo;
var lib = new Vimeo(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.ACCESS_TOKEN);

// Extra variables
var json = "";
var place_holder = 0;
// HAND-PICKED CHANNELS ON VIMEO
var preset_channels = {
	'exp': [	// Experimental
		'/channels/techart',
		'/channels/motiongraphics',
		'/channels/creativetechnology'
	],
	'art': [ // Arts & Design
		'/channels/1nspirational',
		'/channels/fubiz',
		'/channels/psysoda'
	],
	'ani': [ // Animation
		'/channels/everythinganimated',
		'/channels/wineaftercoffee',
		'/channels/animationandpuppets'
	],
	'mus': [ // Music
		'/channels/musicvideos',
		'/channels/hdmusicvideos',
		'/channels/7588' // concerts
	]
};

// Fisher-Yates algorithm to randomly shuffle array
var shuffle_array = function (array) {
	for (var i=0; i<array.length-1; i++) {
		var k = i + Math.floor(Math.random() * (array.length - i));
		var tmp = array[k];
		array[k] = array[i];
		array[i] = tmp;
	}
}

var get_video_json = function (channel_path, callback) {
	lib.request({
		path : channel_path,
		query : {
			page : 1,
			per_page : 15,
			sort: 'date'
		}
	}, /*callback*/ function (error, vids_body, status_code, headers) {
		if (error) {
			console.log(error);
			callback('ERROR: ' + error);
		} else {
			callback(vids_body);
		}
	});
}

var get_json = function (channel_stub, callback) {
	var all_videos = { 'data': [] }

	async.each(preset_channels[channel_stub], function(data, callback) {
		get_video_json(data + '/videos', function(vids_body) {
			all_videos.data = all_videos.data.concat(vids_body.data);
			callback();
		});
	}, function(err) {
		if (err) {
			console.log(err);
		} else {
			// console.log(all_videos);
			callback(all_videos);
		}
	});
}

var construct_short_json = function (data) {
	var short_json = [];
	for (var i=0; i<data.length; i++) {
		var object = new Object();
		object.uri = data[i].uri;
		object.name = data[i].name;
		object.link = data[i].link;
		short_json.push(object);
	}
	return short_json;
}


// / / / / / / / //
// R O U T I N G //
// / / / / / / / //

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/exp');
});

// EXPERIMENTAL
router.get('/exp', function(req, res, next) {
	get_json('exp', function(body) {
		var short_json = construct_short_json(body.data);
		shuffle_array(short_json);

		res.render('index', { 
			title: 'Experimental', 
			tag: 'exp',
			json: JSON.stringify(short_json)
		});

	});
});

/*
router.get('/exp/:id', function(req, res, next) {
	place_holder = 0;
	if (!json) {
		place_holder = req.params.id;
		res.redirect('/exp');
	} else {
		res.render('index', { 
			title: 'Experimental', 
			tag: 'exp', 
			object: json.data[req.params.id], 
			curr_id: req.params.id 
		});
	}
});
*/


// ARTS & DESIGN
router.get('/art', function(req, res, next) {
	get_json('art', function(body) {
		var short_json = construct_short_json(body.data);
		shuffle_array(short_json);

		res.render('index', { 
			title: 'Arts & Design', 
			tag: 'art',
			json: JSON.stringify(short_json)
		});

	});
});


// ANIMATION
router.get('/ani', function(req, res, next) {
	get_json('ani', function(body) {
		var short_json = construct_short_json(body.data);
		shuffle_array(short_json);

		res.render('index', { 
			title: 'Animation', 
			tag: 'ani',
			json: JSON.stringify(short_json)
		});

	});
});

// MUSIC
router.get('/mus', function(req, res, next) {
	get_json('mus', function(body) {
		var short_json = construct_short_json(body.data);
		shuffle_array(short_json);

		res.render('index', { 
			title: 'Music', 
			tag: 'mus',
			json: JSON.stringify(short_json)
		});

	});
});


module.exports = router;
