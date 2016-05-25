'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    multer = require('multer'),
    User = mongoose.model('user');

module.exports = router;


router.route('/')

    .get(function(req, res, next) {

        User.findById(req.session.auth._id, function (err, user){

            res.format({
                html: function(){
                    res.render('profile/edit-avatar', {
                        auth: req.session.auth,
                        user: user,
                        title: 'Edit avatar',
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json({message: 'API/profile/edit-avatar'});
                }
            });
        });
    })

    .post(function(req, res, next) {

        var text,
            image = {
                path: 'public/assets/uploads/avatars/',
                url: req.protocol + '://' + req.get('host') +'/assets/uploads/avatars/',
                sizeLimit: 1*1000*1000
            },
            storage = multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, image.path);
                },
                filename: function (req, file, callback) {

                    // set mimetype restriction
                    if(file.mimetype == 'image/jpeg') image.mimetype = '.jpg';
                    if(file.mimetype == 'image/png') image.mimetype = '.png';

                    if(image.mimetype){
                        // set avatar name
                        image.name = req.session.auth._id + image.mimetype;
                        callback(null, image.name);
                    } else {
                        text = 'Image must be .jpg or .png.';
                        console.log(chalk.bgRed(text));

                        res.format({
                            html: function(){
                                res.redirect('?error='+ text);
                            },
                            json: function(){
                                res.json({message: text});
                            }
                        });
                    }
                }
            }),
            uploadImage = multer({
                storage : storage,
                limits: { fileSize: image.sizeLimit }
            }).single('avatar');

        // upload
        uploadImage(req,res,function(err) {
            if(err) {
                console.log(chalk.bgRed('Error uploading file.'));
                console.log(chalk.dim(err));

                res.format({
                    html: function(){
                        res.redirect('?error='+ err);
                    },
                    json: function(){
                        res.json({error: err});
                    }
                });

            } else {
                // upload successful
                text = 'File is uploaded.';
                console.log(chalk.bgGreen(text));
                console.log(chalk.dim(image));

                // Set the user image
                User.findById(req.session.auth._id, function (err, user){

                    user.preview_image = image.url + image.name;
                    user.save(function(err, user) {
                        if(err) return console.log(chalk.bgRed(err));
                        else{
                            text = 'Avatar updated.';
                            console.log(chalk.bgGreen(text));

                            res.format({
                                html: function(){
                                    res.redirect('/profile');
                                },
                                json: function(){
                                    res.json({success: text});
                                }
                            });
                        }
                    });
                });
            }
        });
    });