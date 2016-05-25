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
        PostCategory.find({}, function (err, categories){
            res.format({
                html: function(){
                    res.redirect('/post')
                },
                json: function(){
                    res.json({message: 'API/post/edit'});
                }
            });
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




var msg = {
    0: 'No method.',
    1: 'Post found.',
    2: 'Post updated !',
    3: 'Post not found.',
    4: 'Post deleted.',
    5: 'Name already exist.',
    6: 'Url name already exist.',
    7: 'Something is missing.',
};


router.route('/id/:id')

    .get(function(req, res) {
        PostCategory.find({}, function (err, categories){
            Post.findById(req.params.id, function (err, post) {

                res.format({
                    html: function(){
                        res.render('post/edit', {
                            auth: req.session.auth,
                            title: 'Post edit',
                            categories: categories,
                            post: post,
                            success: req.query.success,
                            error: req.query.error
                        });
                    },
                    json: function(){
                        res.json({message: 'API/post/edit'});
                    }
                });
            });
        });
    })

    .post(function(req, res) {
        console.log(req.body);

        // _method allowed: PUT, DELETE
        switch (true){

            case(req.body._method != null && req.body._method === 'PUT'):
                // update user
                Post.findById(req.params.id, function (err, post) {
                    Post.findOne({name: req.body.name}, function (err, nameCheck) {
                        Post.findOne({url_name: encodeURI(req.body.name)}, function (err, url_nameCheck) {
                            switch(true){

                                case(!req.body.category
                                || !req.body.name
                                || !req.body.description
                                || !req.body.display):

                                    // missing error
                                    console.log(chalk.bgRed(msg[7]));
                                    return res.redirect('?error=' + msg[7] + '&' +
                                        'name=' + req.body.name + '&' +
                                        'description=' + req.body.description + '&' +
                                        'category=' + req.body.category + '&' +
                                        'display=' + req.body.display
                                    );
                                    break;

                                case(req.body.name !== post.name && nameCheck != null):
                                    // email already exist
                                    console.log(chalk.bgRed(msg[5]));

                                    return res.format({
                                        html: function(){
                                            res.redirect("?error="+ msg[5]);
                                        },
                                        json: function(){
                                            res.json({error: msg[5]});
                                        }
                                    });
                                    break;

                                case(encodeURI(req.body.name) !== post.url_name && url_nameCheck != null):
                                    // username already exist
                                    console.log(chalk.bgRed(msg[6]));

                                    return res.format({
                                        html: function(){
                                            res.redirect("?error="+ msg[6]);
                                        },
                                        json: function(){
                                            res.json({error: msg[6]});
                                        }
                                    });
                                    break;

                                case(post == null):
                                    console.log(chalk.bgRed(msg[3]));

                                    return res.format({
                                        html: function(){
                                            res.redirect("?error="+ msg[3]);
                                        },
                                        json: function(){
                                            res.json({error: msg[3]});
                                        }
                                    });
                                    break;

                                default :
                                    console.log(chalk.bgGreen(msg[1]));

                                    post.name = req.body.name;
                                    post.url_name = encodeURI(req.body.name);
                                    post.description = req.body.description;
                                    post.category = req.body.category;
                                    post.display = req.body.display;
                                    post.updated_at = Date.now();

                                    console.log(post)
                                    post.save(function(err, lol) {
                                        if(err) console.log(chalk.bgRed(err));
                                        else console.log(chalk.bgGreen(msg[2]));

                                        return res.format({
                                            html: function(){
                                                res.redirect("/post?success="+ msg[2]);
                                            },
                                            json: function(){
                                                res.json({success: msg[2]});
                                            }
                                        });
                                    });
                                    break;
                            }
                        });
                    });
                });
                break;

            case(req.body._method != null && req.body._method === 'DELETE'):
                Post.findById(req.params.id, function (err, post) {

                    switch(true){
                        case(post != null):
                            console.log(chalk.bgGreen(msg[1]));
                            console.log(chalk.dim(post));

                            post.remove(function (err, post) {
                                if(err) console.log(chalk.bgRed(err));
                                else console.log(chalk.bgGreen(msg[2]));

                                res.format({
                                    html: function(){
                                        res.redirect('/user?success='+ msg[4]);
                                    },
                                    json: function(){
                                        res.json({success: msg[4]});
                                    }
                                });
                            });
                            break;

                        default :
                            console.log(chalk.bgRed(msg[3]));
                            break;
                    }
                });
                break;

            default :
                console.log(chalk.bgRed(msg[0]));

                res.format({
                    html: function(){
                        res.redirect('?error='+ msg[0]);
                    },
                    json: function(){
                        res.json(msg[0]);
                    }
                });
                break;
        }
    })


    .put(function(req, res) {
        // update user
        Post.findById(req.params.id, function (err, post) {
            Post.findOne({name: req.body.name}, function (err, nameCheck) {
                Post.findOne({url_name: encodeURI(req.body.name)}, function (err, url_nameCheck) {
                    switch(true){

                        case(!req.body.category
                        || !req.body.name
                        || !req.body.description
                        || !req.body.display):

                            // missing error
                            console.log(chalk.bgRed(msg[7]));
                            return res.redirect('?error=' + msg[7] + '&' +
                                'name=' + req.body.name + '&' +
                                'description=' + req.body.description + '&' +
                                'category=' + req.body.category + '&' +
                                'display=' + req.body.display
                            );
                            break;

                        case(req.body.name !== post.name && nameCheck != null):
                            // email already exist
                            console.log(chalk.bgRed(msg[5]));

                            return res.format({
                                html: function(){
                                    res.redirect("?error="+ msg[5]);
                                },
                                json: function(){
                                    res.json({error: msg[5]});
                                }
                            });
                            break;

                        case(encodeURI(req.body.name) !== post.url_name && url_nameCheck != null):
                            // username already exist
                            console.log(chalk.bgRed(msg[6]));

                            return res.format({
                                html: function(){
                                    res.redirect("?error="+ msg[6]);
                                },
                                json: function(){
                                    res.json({error: msg[6]});
                                }
                            });
                            break;

                        case(post == null):
                            console.log(chalk.bgRed(msg[3]));

                            return res.format({
                                html: function(){
                                    res.redirect("?error="+ msg[3]);
                                },
                                json: function(){
                                    res.json({error: msg[3]});
                                }
                            });
                            break;

                        default :
                            console.log(chalk.bgGreen(msg[1]));

                            post.name = req.body.name;
                            post.url_name = encodeURI(req.body.name);
                            post.description = req.body.description;
                            post.category = req.body.category;
                            post.display = req.body.display;
                            post.updated_at = Date.now();

                            console.log(post)
                            post.save(function(err, lol) {
                                if(err) console.log(chalk.bgRed(err));
                                else console.log(chalk.bgGreen(msg[2]));

                                return res.format({
                                    html: function(){
                                        res.redirect("/post?success="+ msg[2]);
                                    },
                                    json: function(){
                                        res.json({success: msg[2]});
                                    }
                                });
                            });
                            break;
                    }
                });
            });
        });
    })

    .delete(function(req, res) {
        Post.findById(req.params.name, function (err, post) {

            switch(true){
                case(post != null):
                    console.log(chalk.bgGreen(msg[1]));
                    console.log(chalk.dim(post));

                    post.remove(function (err, post) {
                        if(err) console.log(chalk.bgRed(err));
                        else console.log(chalk.bgGreen(msg[2]));

                        res.format({
                            html: function(){
                                res.redirect('/user?success='+ msg[4]);
                            },
                            json: function(){
                                res.json({success: msg[4]});
                            }
                        });
                    });
                    break;

                default :
                    console.log(chalk.bgRed(msg[3]));
                    break;
            }
        });
    });
