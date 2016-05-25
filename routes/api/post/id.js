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


// id param
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



router.get('/:id', function(req, res, next) {
    Post.findById(req.params.id, function (err, post){
        res.format({
            html: function(){
                res.render('post/show', {
                    auth: req.session.auth,
                    title: 'Post details',
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