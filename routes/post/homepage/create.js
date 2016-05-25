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

    // GET homepage/create
    .get(function(req, res, next) {

        //retrieve all users from MongoDB
        PostHomepage.find({}, function (err, posts) {
            if (err) {
                console.log(err);

                return console.error(err);
            } else {
                res.format({
                    // HTML response
                    html: function(){
                        res.render('post/homepage/create', {
                            auth: req.session.auth,
                            title: 'Create post',
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
    });




