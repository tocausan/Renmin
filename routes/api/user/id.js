'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = router;


// root
router.get('/', function(req, res, next) {

    // return
    res.json({'message': 'API/user/id'});
});


// id param
router.param('id', function(req, res, next, id) {

    User.findById(id, function (err, id){

        if (err) {
            var msg = 'No user with this ID.';
            console.log(chalk.bgRed(msg));

            res.format({
                html: function(){
                    res.redirect("/user?error="+ msg);
                },
                json: function(){
                    res.json({error: msg});
                }
            });
        } else {
            next();
        }
    });
});



router.route('/:id')

    .get(function(req, res) {

        User.findById(req.params.id, function (err, user) {

            res.format({
                html: function(){
                    res.render('user/show', {
                        auth: req.session.auth,
                        title: 'User details',
                        user: user,
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json(user);
                }
            });
        })
    });


