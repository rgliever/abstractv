var get_video_json = function (channel_path, callback) {
	lib.request({
		path : channel_path,
		query : {
			page : 1,
			per_page : 10,
			sort: 'date'
		}
	}, /*callback*/ function (error, vids_body, status_code, headers) {
		if (error) {
			console.log(error);
			callback('ERROR #2!');
		} else {
			callback(vids_body);
		}
	});
}

var get_json = function (channel_stub, callback) {
	var all_videos = {
		'data': []
	}
	console.log("PRESETS: ", preset_channels['exp'][0]);
	async.each(preset_channels[channel_stub], function(data, callback) {
		console.log("Channel: " + data.name);
		get_video_json(data + '/videos', function(vids_body) {
			all_videos.data = all_videos.data.concat(vids_body.data);
			callback();
		});
	}, function(err) {
		console.log(all_videos);
		callback(all_videos);
	});
}

// Calls Vimeo API with provided path and executes callback after
var get_channel_json = function (category_path, callback) {
		// first get 3 category channels
		lib.request(/*options*/{
			path : category_path,
			query : {
				page : 1,
				per_page : 3,
				sort : 'followers'
			}
		}, /*callback*/function (error, body, status_code, headers) {
			if (error) {
				console.log('error');
				console.log(error);
				callback('ERROR!');
			} else {
				// get 10 videos for each channel
				var all_videos = {
					"data": []
				};
				/* MAKE ASYNC CALL TO GET VIDEOS FOR 3 CHANNELS */
				async.each(body.data.slice(0, 3),
					function(data, callback) {
						console.log("Channel: " + data.name);
						get_video_json(data.uri+'/videos', function(vids_body) {
							all_videos.data = all_videos.data.concat(vids_body.data);
							callback();
						});
					}, function(err) {

						callback(all_videos);
				});
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