'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    fs = require('fs'),
    mongoose = require('mongoose'),
    Post = mongoose.model('post'),
    PostCategory = mongoose.model('post-category'),
    PostContent = mongoose.model('post-content'),
    PostContentType = mongoose.model('post-content-type');

module.exports = router;


router.get('/', function(req, res, next) {
    // get posts & post categories
    PostCategory.find({}, function (err, postCategories){
        res.format({
            html: function(){
                res.render('post/category', {
                    auth: req.session.auth,
                    title: 'Categories',
                    postCategories: postCategories,
                    success: req.query.success,
                    error: req.query.error
                });
            },
            json: function(){
                res.json(postCategories);
            }
        });
    });
});


// categoryName param
router.param('categoryName', function(req, res, next, categoryName) {

    PostCategory.findOne({url_name: categoryName}, function (err, category){
        switch (true){
            case(category != null):
                next();
                break;

            default :
                var msg = 'No category has been found there.';
                console.log(chalk.bgRed(msg));

                res.format({
                    html: function(){
                        res.render('error/404', {
                            auth: req.session.auth,
                            message: msg,
                            success: req.query.success,
                            error: req.query.error
                        });
                    },
                    json: function(){
                        res.json({error: msg});
                    }
                });
                break;
        }
    });
});

// postName param
router.param('postName', function(req, res, next, postName) {

    Post.findOne({url_name: postName}, function (err, post){
        switch (true){
            case(post != null):
                next();
                break;

            default :
                var msg = 'No post has been found there.';
                console.log(chalk.bgRed(msg));

                res.format({
                    html: function(){
                        res.render('error/404', {
                            auth: req.session.auth,
                            message: msg,
                            success: req.query.success,
                            error: req.query.error
                        });
                    },
                    json: function(){
                        res.json({error: msg});
                    }
                });
                break;
        }
    });
});



router.get('/:categoryName', function(req, res, next) {
    // get category & category's posts
    PostCategory.findOne({url_name: req.params.categoryName}, function (err, category){
        Post.find({category: req.params.categoryName}, function (err, posts){
            res.format({
                html: function(){
                    res.render('home/category', {
                        auth: req.session.auth,
                        title: req.params.categoryName +' posts',
                        category: category,
                        posts: posts,
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json(posts);
                }
            });
        });
    });
});


router.get('/:categoryName/:postName', function(req, res, next) {
    // get post
    PostCategory.findOne({url_name: req.params.categoryName}, function (err, category){
        Post.findOne({url_name: req.params.postName}, function (err, post){
            res.format({
                html: function(){
                    res.render('home/post', {
                        auth: req.session.auth,
                        title: req.params.postName,
                        category: category,
                        post: post,
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json(posts);
                }
            });
        });
    });
});