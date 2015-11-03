// initial setup and routing stuff
var express = require('express');
var router = express.Router();
var https = require('https');

// VIMEO API STUFF
var CLIENT_ID = 'b4760bed5e4deb04e2153e81d5c573a738bb6085';
var CLIENT_SECRET = 'ltaQMGVW9XVm8727xBDYb2pVHNk46/zTwWaNP2ZzZlYS3Y6idGrqrFv4Oag2XERkCAm7efp83lpT6pwcXIDLfBBWTk35t3I6ISyRRWkZuuVchfdAVU0AxYQzEZu47W2E'
var ACCESS_TOKEN = 'a285411f565d45e3cdbed7b5ab924d4b';
var Vimeo = require('vimeo').Vimeo;
var lib = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

// Extra variables
var json = "";
var place_holder = -1;

// Calls Vimeo API with provided path and executes callback after
var get_json = function (category_path, callback) {
	 lib.request(/*options*/{
			// This is the path for the videos contained within the staff picks channels
			path : category_path,
			//This adds the parameters to request page two, and 10 items per page
			query : {
				page : 1,
				per_page : 30
			}
		}, /*callback*/function (error, body, status_code, headers) {
			if (error) {
				console.log('error');
				console.log(error);
				callback('ERROR!');
			} else {
				// console.log('body');
				// console.log(body);
				callback(body);
			}
/*
			console.log('status code');
			console.log(status_code);
			console.log('headers');
			console.log(headers);
*/
			//console.log(body.data[0].link);
		});
}

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/exp');
});

/* Calls Vimeo API to set json string to result for experimental videos, then redirects to one video */
router.get('/exp', function(req, res, next) {
	get_json('/categories/experimental/videos', function(body) {
		json = body;
		if (place_holder >= 0) {
			res.redirect('/exp/' + place_holder)
		} else {
			res.redirect('/exp/0');
		}
	});
});

router.get('/exp/:id', function(req, res, next) {
	place_holder = -1;
	if (!json) {
		place_holder = req.params.id;
		res.redirect('/exp');
	} else {
		res.render('index', { title: 'Experimental', object: json.data[req.params.id], curr_id: req.params.id });
	}
});

router.get('/art', function(req, res, next) {
	res.render('index', { title: 'Art' });
});

router.get('/ani', function(req, res, next) {
	res.render('index', { title: 'Animation' });
});


module.exports = router;
