'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = router;


router.route('/')

    .get(function(req, res) {
        res.format({
            html: function(){
                res.redirect('/user');
            },
            json: function(){
                res.json({message: 'API/user/edit'});
            }
        });
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



var msg = {
    0: 'No method.',
    1: 'user found.',
    2: 'User updated !',
    3: 'user not found.',
    4: 'User deleted.',
    5: 'Email already exist.',
    6: 'Username already exist.'
};


router.route('/id/:id')

    .get(function(req, res) {

        User.findById(req.params.id, function (err, user) {

            res.format({
                html: function(){
                    res.render('user/edit', {
                        auth: req.session.auth,
                        title: 'User edit',
                        user: user,
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json({message: 'API/user/edit'});
                }
            });
        })
    })

    .post(function(req, res) {
        // _method allowed: PUT, DELETE
        switch (true){

            case(req.body._method != null && req.body._method === 'PUT'):
                // update user
                User.findById(req.params.id, function (err, user) {
                    User.findOne({email: req.body.email}, function (err, emailCheck) {
                        User.findOne({'username': req.body.username}, function (err, usernameCheck) {
                            switch(true){

                                case(req.body.email !== user.email && emailCheck != null):
                                    // email already exist
                                    console.log(chalk.bgRed(msg[5]));

                                    return res.format({
                                        html: function(){
                                            res.redirect("?error="+ msg[5]);
                                        },
                                        json: function(){
                                            res.json({error: msg[5]});
                                        }
                                    });
                                    break;

                                case(req.body.username !== user.username && usernameCheck != null):
                                    // username already exist
                                    console.log(chalk.bgRed(msg[6]));

                                    return res.format({
                                        html: function(){
                                            res.redirect("?error="+ msg[6]);
                                        },
                                        json: function(){
                                            res.json({error: msg[6]});
                                        }
                                    });
                                    break;

                                case(user == null):
                                    console.log(chalk.bgRed(msg[3]));

                                    return res.format({
                                        html: function(){
                                            res.redirect("?error="+ msg[3]);
                                        },
                                        json: function(){
                                            res.json({error: msg[3]});
                                        }
                                    });
                                    break;

                                default :
                                    console.log(chalk.bgGreen(msg[1]));

                                    // Update status (admin only)
                                    if(req.body.status && req.session.auth.status >= 3){
                                        user.status = req.body.status;
                                    }

                                    user.email = req.body.email;
                                    user.username = req.body.username;
                                    user.firstname = req.body.firstname;
                                    user.lastname = req.body.lastname;
                                    user.save(function(err, user) {
                                        if(err) console.log(chalk.bgRed(err));
                                        else console.log(chalk.bgGreen(msg[2]));

                                        return res.format({
                                            html: function(){
                                                res.redirect("/user?success="+ msg[2]);
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

            case(req.body._method != null && req.body._method === 'DELETE'):
                User.findById(req.params.id, function (err, user) {

                    switch(true){
                        case(user != null):
                            console.log(chalk.bgGreen(msg[1]));
                            console.log(chalk.dim(user));

                            user.remove(function (err, user) {
                                if(err) console.log(chalk.bgRed(err));
                                else console.log(chalk.bgGreen(msg[2]));

                                res.format({
                                    html: function(){
                                        res.redirect('/user?success='+ msg[4]);
                                    },
                                    json: function(){
                                        res.json({success: msg[4]});
                                    }
                                });
                            });
                            break;

                        default :
                            console.log(chalk.bgRed(msg[3]));
                            break;
                    }
                });
                break;

            default :
                console.log(chalk.bgRed(msg[0]));

                res.format({
                    html: function(){
                        res.redirect('?error='+ msg[0]);
                    },
                    json: function(){
                        res.json(msg[0]);
                    }
                });
                break;
        }
    })


    .put(function(req, res) {
        // update user
        User.findById(req.params.id, function (err, user) {
            User.findOne({email: req.body.email}, function (err, emailCheck) {
                User.findOne({'username': req.body.username}, function (err, usernameCheck) {
                    switch(true){

                        case(req.body.email !== user.email && emailCheck != null):
                            // email already exist
                            console.log(chalk.bgRed(msg[5]));

                            return res.format({
                                html: function(){
                                    res.redirect("?error="+ msg[5]);
                                },
                                json: function(){
                                    res.json({error: msg[5]});
                                }
                            });
                            break;

                        case(req.body.username !== user.username && usernameCheck != null):
                            // username already exist
                            console.log(chalk.bgRed(msg[6]));

                            return res.format({
                                html: function(){
                                    res.redirect("?error="+ msg[6]);
                                },
                                json: function(){
                                    res.json({error: msg[6]});
                                }
                            });
                            break;

                        case(user == null):
                            console.log(chalk.bgRed(msg[3]));

                            return res.format({
                                html: function(){
                                    res.redirect("?error="+ msg[3]);
                                },
                                json: function(){
                                    res.json({error: msg[3]});
                                }
                            });
                            break;

                        default :
                            console.log(chalk.bgGreen(msg[1]));

                            // Update status (admin only)
                            if(req.body.status && req.session.auth.status >= 3){
                                user.status = req.body.status;
                            }

                            user.email = req.body.email;
                            user.username = req.body.username;
                            user.firstname = req.body.firstname;
                            user.lastname = req.body.lastname;
                            user.save(function(err, user) {
                                if(err) console.log(chalk.bgRed(err));
                                else console.log(chalk.bgGreen(msg[2]));

                                return res.format({
                                    html: function(){
                                        res.redirect("/user?success="+ msg[2]);
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
        User.findById(req.params.id, function (err, user) {

            switch(true){
                case(user != null):
                    console.log(chalk.bgGreen(msg[1]));
                    console.log(chalk.dim(user));

                    user.remove(function (err, user) {
                        if(err) console.log(chalk.bgRed(err));
                        else console.log(chalk.bgGreen(msg[2]));

                        res.format({
                            html: function(){
                                res.redirect('/user?success='+ msg[4]);
                            },
                            json: function(){
                                res.json({success: msg[4]});
                            }
                        });
                    });
                    break;

                default :
                    console.log(chalk.bgRed(msg[3]));
                    break;
            }
        });
    });


