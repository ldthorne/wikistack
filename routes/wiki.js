var express = require('express');
var models = require('../models/');

var router = express.Router();
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
	res.redirect('/');
});



router.post('/', function(req, res, next) {
	var title = req.body.title;
	var content = req.body.content;
	var page = new Page({
		title: title,
		content: content,
	});
	page.save()
		.then(res.redirect(page.route))
		.then(null, next);		
});

router.get('/add', function(req, res) {
	res.render('addpage');
});

router.get("/:urlTitle", function(req, res, next){
	Page.findOne({"urlTitle": req.params.urlTitle}, function(err, page){
		if(err){
			console.error(err);
		}else{
			res.render("wikipage", {title: page.title, urlTitle: page.urlTitle, author: page.author, content: page.content});
		};
	});
})



module.exports = router;