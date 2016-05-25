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
                    res.render('post/create', {
                        auth: req.session.auth,
                        title: 'Create a post',
                        categories: categories,
                        name: req.query.name,
                        description: req.query.description,
                        category: req.query.category,
                        display: req.query.display,
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json({message: 'API/post/create'});
                }
            });
        });
    })

    .post(function(req, res) {

        console.log(chalk.dim(JSON.stringify(req.body)));


        var msg = {
            0: 'Something is missing.',
            1: 'Name already exist.',
            2: 'URL name already exist.',
            3: 'Post created.',
            4: 'Post added to category.'
        };


        // Exist error
        Post.findOne({ name: req.body.name }, function (err, nameCheck) {
            Post.findOne({url_name: encodeURIComponent(req.body.name)}, function (err, url_nameCheck) {
                switch (true) {

                    case(!req.body.category
                    || !req.body.name
                    || !req.body.description
                    || !req.body.display):

                        // missing error
                        console.log(chalk.bgRed(msg[0]));
                        return res.redirect('?error=' + msg[0] + '&' +
                            'name=' + req.body.name + '&' +
                            'description=' + req.body.description + '&' +
                            'category=' + req.body.category + '&' +
                            'display=' + req.body.display
                        );
                        break;

                    case(nameCheck != null):
                        // name error
                        console.log(chalk.bgRed(msg[1]));
                        return res.redirect('?error=' + msg[1] + '&' +
                            'name=' + req.body.name + '&' +
                            'description=' + req.body.description + '&' +
                            'category=' + req.body.category + '&' +
                            'display=' + req.body.display
                        );
                        break;

                    case(url_nameCheck != null):
                        // url name error
                        console.log(chalk.bgRed(msg[2]));
                        return res.redirect('?error=' + msg[2] + '&' +
                            'name=' + req.body.name + '&' +
                            'description=' + req.body.description + '&' +
                            'category=' + req.body.category + '&' +
                            'display=' + req.body.display
                        );
                        break;

                    default :
                        // Create user
                        var p = new Post;
                        p.name = req.body.name;
                        p.url_name = encodeURIComponent(req.body.name);
                        p.description = req.body.description;
                        p.display = req.body.display;
                        p.category = req.body.category;
                        p.save(function (err, lol) {
                            if (err) console.log(chalk.bgRed(err));

                            console.log(chalk.bgGreen(msg[3]));

                            PostCategory.findOne({name: req.body.category}, function (err, category) {
                                Post.findOne({name: req.body.name}, function (err, post) {
                                    // Add post to category
                                    category.posts.push(post._id);
                                    category.save(function (err, small) {
                                        if (err) return console.log(chalk.bgRed(err));
                                        else console.log(chalk.bgGreen(msg[4]));

                                        console.log(chalk.bgGreen(msg[3]));
                                        res.redirect("/post?success=" + msg[3]);
                                    });
                                });
                            });
                        });
                        break;
                }
            });
        });
    });

