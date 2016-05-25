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
                res.redirect('/post/category/home')
            },
            json: function(){
                res.json({message: 'API/post'});
            }
        });
    });
