'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = router;



router.route('/')

    .get(function(req, res, next) {

        User.findById(req.session.auth._id, function (err, user){

            res.format({
                html: function(){
                    res.render('profile/edit', {
                        auth: req.session.auth,
                        user: user,
                        title: 'Edit profile',
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json({message: 'API/profile/edit'});
                }
            });
        });
    })

    .post(function(req, res) {

        // alert if no method
        if(!req.body._method) console.log(chalk.bgRed('No method.'));
        else console.log('method '+ req.body._method);

        // _method allowed: PUT, DELETE
        switch(req.body._method){

            case('PUT'):

                console.log(req.body)
                var msg = {
                    0: 'Email already exist.',
                    1: 'Username already exist.',
                    2: 'Profile updated.'
                };

                User.findOne({ 'email': req.body.email }, function (err, checkEmail){
                    User.findOne({ 'username': req.body.username }, function (err, checkUsername){
                        User.findById(req.session.auth._id, function (err, user){
                            switch (true){

                                case(req.body.email != req.session.auth.email && checkEmail != null):
                                    // email already exist
                                    console.log(chalk.bgRed(msg[0]));

                                    return res.format({
                                        html: function(){
                                            res.redirect("?error="+ msg[0]);
                                        },
                                        json: function(){
                                            res.json({error: msg[0]});
                                        }
                                    });
                                    break;

                                case(req.body.username != req.session.auth.username && checkUsername != null):
                                    // username already exist
                                    console.log(chalk.bgRed(msg[1]));

                                    return res.format({
                                        html: function(){
                                            res.redirect("?error="+ msg[1]);
                                        },
                                        json: function(){
                                            res.json({error: msg[1]});
                                        }
                                    });
                                    break;

                                default :
                                    // update profile
                                    user.email = req.body.email;
                                    user.username = req.body.username;
                                    user.firstname = req.body.firstname;
                                    user.lastname = req.body.lastname;
                                    user.save(function(err, lol) {
                                        if(err) console.log(chalk.bgRed(err));
                                        else console.log(chalk.bgGreen(msg[2]));

                                        return res.format({
                                            html: function(){
                                                res.redirect("/profile?success="+ msg[2]);
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


            case('DELETE'):
                // delete user
                User.findById(req.session.auth._id, function (err, user) {
                    var msg = 'User deleted !';

                    user.remove(function(err, user) {
                        if(err) console.log(chalk.bgRed(err));
                        else{
                            // Update session
                            req.session.auth = null;

                            console.log(chalk.bgGreen(msg));
                            res.format({
                                html: function(){
                                    res.redirect("/log/in?success="+ msg);
                                },
                                json: function(){
                                    res.json({success: msg});
                                }
                            });
                        }
                    });
                });
                break;
        }

    })

    .put(function(req, res) {
        var msg = {
            0: 'Email already exist.',
            1: 'Username already exist.',
            2: 'Profile updated.'
        };

        User.findOne({ 'email': req.body.email }, function (err, checkEmail){
            User.findOne({ 'username': req.body.username }, function (err, checkUsername){
                User.findById(req.session._id, function (err, user){
                    switch (true){

                        case(req.body.email != req.session.auth.email && checkEmail != null):
                            // email already exist
                            console.log(chalk.bgRed(msg[0]));

                            return res.format({
                                html: function(){
                                    res.redirect("?error="+ msg[0]);
                                },
                                json: function(){
                                    res.json({error: msg[0]});
                                }
                            });
                            break;

                        case(req.body.username != req.session.auth.username && checkUsername != null):
                            // username already exist
                            console.log(chalk.bgRed(msg[1]));

                            return res.format({
                                html: function(){
                                    res.redirect("?error="+ msg[1]);
                                },
                                json: function(){
                                    res.json({error: msg[1]});
                                }
                            });
                            break;

                        default :
                            // update profile
                            user.email = req.body.email;
                            user.username = req.body.username;
                            user.firstname = req.body.firstname;
                            user.lastname = req.body.lastname;
                            user.save(function(err, lol) {
                                if(err) console.log(chalk.bgRed(err));
                                else console.log(chalk.bgGreen(msg[2]));

                                return res.format({
                                    html: function(){
                                        res.redirect("/profile?success="+ msg[2]);
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
        // delete user
        User.findById(req.session.auth._id, function (err, user) {
            var msg = 'User deleted !';

            user.remove(function(err, user) {
                if(err) console.log(chalk.bgRed(err));
                else{
                    // Update session
                    req.session.auth = null;

                    console.log(chalk.bgGreen(msg));
                    res.format({
                        html: function(){
                            res.redirect("/log/in?success="+ msg);
                        },
                        json: function(){
                            res.json({success: msg});
                        }
                    });
                }
            });
        });
    });
