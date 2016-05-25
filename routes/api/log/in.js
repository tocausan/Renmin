'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('user'),
    UserPassword = mongoose.model('user-password'),
    passwordHash = require('password-hash');

module.exports = router;


router.route('/')

    .get(function(req, res, next){

        res.format({
            html: function(){
                res.render('log/in', {
                    title: 'Login',
                    redirect: req.query.redirect,
                    success: req.query.success,
                    error: req.query.error
                })
            },
            json: function(){
                res.json({message: 'API/log/in'});
            }
        });
    })

    .post(function(req, res) {

        var msg = {
            0: 'User found.',
            1: 'User not found.',
            2: 'User not confirmed, please check your emails.',
            3: 'Password found.',
            4: 'Password not found.',
            5: 'Logged in.',
            6: 'Username or password not correct.',
            7: 'Session created.',
            8: 'Session updated.'
        };


        // check user by username
        User.findOne({username: req.body.username}, function (err, user) {
            switch (true) {

                case(user != null):
                    // user exist
                    console.log(chalk.bgGreen(msg[0]));

                    // check password
                    UserPassword.findOne({user: user._id}, 'password', function (err, password) {
                        switch (true) {

                            case(user.confirmed != true):
                                // user not confirmed
                                console.log(chalk.bgRed(msg[2]));

                                res.format({
                                    html: function () {
                                        res.redirect('?error=' + msg[2]);
                                    },
                                    json: function(){
                                        res.json({
                                            error: msg[2]
                                        });
                                    }
                                });
                            break;

                            case(password != null && passwordHash.verify(req.body.password, password.password)):
                                // password exist and correct
                                console.log(chalk.bgGreen(msg[3]));
                                console.log(chalk.bgGreen(msg[5]));

                                // set session
                                req.session.auth = user;

                                res.format({
                                    html: function () {
                                        res.redirect("/"+ req.query.redirect);
                                    },
                                    json: function(){
                                        res.json({success: msg[5]})
                                    }
                                });
                                break;

                            default :
                                // password not found or incorrect
                                console.log(chalk.bgRed(msg[6]));

                                res.format({
                                    html: function () {
                                        res.redirect('?error=' + msg[6]);
                                    },
                                    json: function(){
                                        res.json({
                                            error: msg[6]
                                        });
                                    }
                                });
                                break;
                        }
                    });
                    break;

                default :
                    // user not found
                    console.log(chalk.bgRed(msg[1]));

                    res.format({
                        html: function () {
                            res.redirect('?error=' + msg[6]);
                        },
                        json: function(){
                            res.json({
                                error: msg[6]
                            });
                        }
                    });
                    break;
            }
        });
    });