'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    passwordHash = require('password-hash'),
    User = mongoose.model('user'),
    UserPassword = mongoose.model('user-password');

module.exports = router;


router.route('/')

    .get(function(req, res, next) {
        res.format({
            html: function(){
                res.render('sign/in', {
                    title: 'Signin',
                    username: req.query.username,
                    firstname: req.query.firstname,
                    lastname: req.query.lastname,
                    redirect: req.query.redirect,
                    success: req.query.success,
                    error: req.query.error
                });
            },
            json: function(){
                res.json({message: 'API/sign/in'});
            }
        });
    })

    .post(function(req, res) {
        var msg = {
            0: 'Something is missing.',
            1: 'Your password must contain at least 6 charaters and match the confirmation.',
            2: 'Email already exist.',
            3: 'Username already exist.',
            4: 'User created.',
            5: 'Password created.',
            6: 'Signed in.'
        };

        var text;

        switch (true){

            case(!req.body.email
                || !req.body.username
                || !req.body.firstname
                || !req.body.lastname
                || !req.body.password
                || !req.body.passconf):

                // misssing error
                console.log(chalk.bgRed(msg[0]));
                return res.redirect('?error='+ msg[0] +'&' +
                    'email='+ req.body.email + '&' +
                    'username='+ req.body.username + '&' +
                    'firstname='+ req.body.firstname + '&' +
                    'lastname='+ req.body.lastname
                );
                break;

            case(req.body.password !== req.body.passconf
                || req.body.password.length < 6):

                // password error
                text = msg[1];
                console.log(chalk.bgRed(msg[1]));
                return res.redirect('?error='+ msg[1] +'&' +
                    'email='+ req.body.email + '&' +
                    'username='+ req.body.username + '&' +
                    'firstname='+ req.body.firstname + '&' +
                    'lastname='+ req.body.lastname
                );
                break;

            default :
                // Exist error
                User.findOne({ email: req.body.email }, function (err, checkEmail){
                    switch (true){
                        case(checkEmail != null):
                            // email error
                            console.log(chalk.bgRed(msg[2]));

                            return res.format({
                                html: function(){
                                    res.redirect('?error='+ msg[2] +'&' +
                                        'email='+ req.body.email + '&' +
                                        'username='+ req.body.username + '&' +
                                        'firstname='+ req.body.firstname + '&' +
                                        'lastname='+ req.body.lastname
                                    );
                                },
                                json: function(){
                                    res.json({error: msg[2]});
                                }
                            });
                            break;

                        default :
                            // Exist error
                            User.findOne({ 'username': req.body.username }, function (err, user) {
                                switch (true) {
                                    case(user != null):
                                        // username error
                                        console.log(chalk.bgRed(msg[3]));

                                        return res.format({
                                            html: function(){
                                                res.redirect('?error='+ msg[3] +'&' +
                                                    'email='+ req.body.email + '&' +
                                                    'username='+ req.body.username + '&' +
                                                    'firstname='+ req.body.firstname + '&' +
                                                    'lastname='+ req.body.lastname
                                                );
                                            },
                                            json: function(){
                                                res.json({error: msg[3]});
                                            }
                                        });
                                        break;

                                    default :
                                        // Create user
                                        var u = new User;
                                        u.email = req.body.email;
                                        u.username = req.body.username;
                                        u.firstname = req.body.firstname;
                                        u.lastname = req.body.lastname;
                                        u.status = 1;
                                        u.date = Date.now();
                                        u.confirmation = passwordHash.generate(req.body.email + req.body.username + req.body.firstname + req.body.lastname + req.body.password);
                                        u.save(function (err, small) {
                                            if(err) console.log(chalk.bgRed(err));
                                            else console.log(chalk.bgGreen(msg[4]));

                                            User.findOne({'username': req.body.username}, function (err, user) {
                                                // Add password
                                                var p = new UserPassword;
                                                p.user = user._id;
                                                p.password = passwordHash.generate(req.body.password);
                                                p.save(function (err, small) {
                                                    if(err) return console.log(chalk.bgRed(err));
                                                    else console.log(chalk.bgGreen(msg[5]));
                                                    console.log(chalk.bgGreen(msg[6]));


                                                    /**
                                                     * Send mail...
                                                     */


                                                    res.format({
                                                        html: function(){
                                                            res.redirect("/log/in?success="+ msg[6]);
                                                        },
                                                        json: function(){
                                                            res.json({success: msg[6]});
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                        break;
                                }
                            });
                            break;
                    }
                });
                break;
        }
    });

