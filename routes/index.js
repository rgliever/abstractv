var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/exp');
});

router.get('/exp', function(req, res, next) {
	res.render('index', { title: 'Experimental' });
});

router.get('/art', function(req, res, next) {
	res.render('index', { title: 'Art' });
});

router.get('/ani', function(req, res, next) {
	res.render('index', { title: 'Animation' });
});



module.exports = router;
