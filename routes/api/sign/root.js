'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router();

module.exports = router;


router.route('/')

    .get(function(req, res, next) {
        res.format({
            html: function(){

                var email = 'coucou@coucou.com',
                    confirmation = 'sha1$24a9a8b4$1$5a6b0b878262dc2ff8f10366f9846455dab6d943';
                return res.redirect('/sign/confirmation?email='+email+'&confirmation='+confirmation);

                res.redirect("/sign/in?redirect="+ req.query.redirect);
            },
            json: function(){
                res.json({message: 'API/sign'});
            }
        });
    });