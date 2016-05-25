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

    // get category & category's posts
    PostCategory.findOne({url_name: 'home'}, function (err, category){
        // get posts
        var posts = [],
            getPosts = function(callback){
                for(var i=0; i<category.posts.length; i++){
                    Post.findById(category.posts[i], function (err, post){
                        posts.push(post);

                        if(posts.length === category.posts.length) callback.call();
                    });
                }
            };

        getPosts(function(){
            console.log(chalk.bgBlue(posts.length +' posts found'));

            res.format({
                html: function(){
                    res.render('home', {
                        auth: req.session.auth,
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


// post param
router.param('id', function(req, res, next, id) {

    Post.findById(id, function (err, post){
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

router.get('/home/:id', function(req, res, next) {
     // get post
    Post.findById(req.params.id, function (err, post){
        res.format({
            html: function(){
                res.render('home/post', {
                    auth: req.session.auth,
                    post: post,
                    success: req.query.success,
                    error: req.query.error
                });
            },
            json: function(){
                res.json(post);
            }
        });
    });
});