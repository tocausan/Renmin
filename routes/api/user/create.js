'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    passwordHash = require('password-hash'),
    User = mongoose.model('user'),
    UserPassword = mongoose.model('user-password');

module.exports = router;


function createPassword() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


router.route('/')

    .get(function(req, res) {
        res.format({
            html: function(){
                res.render('user/create', {
                    auth: req.session.auth,
                    title: 'Create a user',
                    email: req.query.email,
                    username: req.query.username,
                    firstname: req.query.firstname,
                    lastname: req.query.lastname,
                    success: req.query.success,
                    error: req.query.error
                });
            },
            json: function(){
                res.json({message: 'API/user/create'});
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
            5: 'Password created.'
        };

        switch (true){
            case(!req.body.username
            || !req.body.username
            || !req.body.firstname
            || !req.body.lastname):

                // missing error
                console.log(chalk.bgRed(msg[0]));
                return res.redirect('?error='+ msg[0] +'&' +
                    'email='+ req.body.email + '&' +
                    'username='+ req.body.username + '&' +
                    'firstname='+ req.body.firstname + '&' +
                    'lastname='+ req.body.lastname
                );
                break;

            default :
                // Exist error
                User.findOne({ email: req.body.email }, function (err, checkEmail){
                    User.findOne({ username: req.body.username }, function (err, user){

                        switch (true){
                            case(checkEmail != null):

                                // email error
                                console.log(chalk.bgRed(msg[2]));
                                return res.redirect('?error='+ msg[2] +'&' +
                                    'email='+ req.body.email + '&' +
                                    'username='+ req.body.username + '&' +
                                    'firstname='+ req.body.firstname + '&' +
                                    'lastname='+ req.body.lastname
                                );
                                break;

                            case(user != null):

                                // username error
                                console.log(chalk.bgRed(msg[3]));
                                return res.redirect('?error='+ msg[3] +'&' +
                                    'email='+ req.body.email + '&' +
                                    'username='+ req.body.username + '&' +
                                    'firstname='+ req.body.firstname + '&' +
                                    'lastname='+ req.body.lastname
                                );
                                break;

                            default :
                                // Create user
                                var u = new User;
                                u.email = req.body.username;
                                u.username = req.body.username;
                                u.firstname = req.body.firstname;
                                u.lastname = req.body.lastname;
                                u.save(function (err, lol) {
                                    if(err) console.log(chalk.bgRed(err));

                                    console.log(chalk.bgGreen(msg[4]));

                                    User.findOne({'username': req.body.username}, function (err, user) {

                                        // Create password
                                        var p = new UserPassword;
                                        p.user = user._id;
                                        p.password = passwordHash.generate(createPassword());
                                        p.save(function (err, small) {
                                            if(err) return console.log(chalk.bgRed(err));

                                            console.log(chalk.bgGreen(msg[5]));
                                            console.log(chalk.bgGreen(msg[4]));
                                            res.redirect("/user?success="+ msg[4]);
                                        });
                                    });
                                });
                                break;
                        }
                    });
                });
                break;
        }
    });
