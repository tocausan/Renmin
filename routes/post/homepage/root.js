'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    gm = require('gm'),
    mongoose = require('mongoose'),
    PostHomepage = mongoose.model('post-homepage');

module.exports = router;


router.route('/')

    // GET homepage
    .get(function(req, res, next) {

        //retrieve all homepage posts from MongoDB
        PostHomepage.find({}, function (err, posts) {
            if (err) {
                console.log(err);

                return console.error(err);
            } else {
                res.format({
                    // HTML response
                    html: function(){
                        res.render('post/homepage', {
                            auth: req.session.auth,
                            title: 'Homepage index',
                            posts: posts,
                            success: req.query.success,
                            error: req.query.error
                        });
                    },
                    //JSON response
                    json: function(){
                        res.json(posts);
                    }
                });
            }
        });
    })


    // POST homepage (_method: POST, PUT, DELETE)
    .post(function(req, res) {

        if(!req.body._method){
            return console.log('No method !');
        }

        switch(req.body._method){

            case('POST'):
                console.log('method POST');

                /*
                * 1- Create the post data and fill it with title, text, style
                * # 2- Retrieve the post and add the image
                * */


                // Exist error
                PostHomepage.findOne({ 'title': req.body.title }, function (err, exist) {
                    if (exist) {
                        var error = 'Username already exist.';
                        console.log(error);
                        res.format({
                            html: function(){
                                res.redirect(
                                    '?error='+ error +
                                    'title='+ req.body.title +
                                    'text='+ req.body.text
                                );
                            }
                        });
                    }
                    else {
                        // Create post
                        PostHomepage.create({
                            title: req.body.title,
                            url: encodeURIComponent(req.body.title),
                            text: req.body.text,
                            image: '... in process',
                            style: '/* post style */',
                            display: false,
                            date: Date.now()
                        }, function (err, small) {
                            if (err) {
                                return console.log(err)
                            } else {

                                // Set image
                                PostHomepage.findOne({ 'title': req.body.title }, function (err, post) {

                                    // send to image uploader
                                    var success = 'Post created successfully.';
                                    res.format({
                                        html: function(){
                                            res.redirect('/post/homepage/id/'+ post._id +'/image?success='+ success);
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
                break;
        }

    });



