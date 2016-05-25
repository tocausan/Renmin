'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    Post = mongoose.model('post'),
    PostCategory = mongoose.model('post-category');

module.exports = router;


router.route('/')

    .get(function(req, res, next) {
        res.format({
            html: function(){
                res.redirect('/post');
            },
            json: function(){
                res.json({message: 'API/post/name'});
            }
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

router.get('/:categoryName', function(req, res, next) {
    // get category & category's posts
    PostCategory.findOne({url_name: req.params.categoryName}, function (err, category){
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
                    res.render('post/category-post', {
                        auth: req.session.auth,
                        title: category.name +' posts',
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