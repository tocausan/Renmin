'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    multer = require('multer'),
    Post = mongoose.model('post');

module.exports = router;


router.route('/id/:id')

    .get(function(req, res, next) {

        Post.findById(req.params.id, function (err, post){

            res.format({
                html: function(){
                    res.render('post/edit-image', {
                        auth: req.session.auth,
                        post: post,
                        title: 'Edit image',
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json({message: 'API/post/edit-image'});
                }
            });
        });
    })

    .post(function(req, res, next) {

        var msg = {
            0: 'Image must be .jpg or .png.',
            1: 'Error uploading file.',
            2: 'File is uploaded.',
            3: 'Post updated.',
            4: 'Error updating post.'
        };

        var image = {
                name: req.params.id +'.',
                path: 'public/assets/uploads/posts/',
                url: req.protocol + '://' + req.get('host') +'/assets/uploads/posts/',
                sizeLimit: 1*1000*1000
            },
            storage = multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, image.path);
                },
                filename: function (req, file, callback) {
                    // replace mimetype
                    file.mimetype = file.mimetype.replace('image/', '');
                    switch (true){

                        case(file.mimetype == 'jpeg' || file.mimetype == 'png'):
                            // set image name
                            image.name += file.mimetype;
                            callback(null, image.name);

                            break;

                        default :
                            console.log(chalk.bgRed(msg[0]));

                            res.format({
                                html: function(){
                                    res.redirect('?error='+ msg[0]);
                                },
                                json: function(){
                                    res.json({error: msg[0]});
                                }
                            });
                            break;
                    }
                }
            }),
            uploadImage = multer({
                storage : storage,
                limits: { fileSize: image.sizeLimit }
            }).single('image');

        // upload
        uploadImage(req,res,function(err) {

            switch (true){

                case(err != null):
                    console.log(chalk.bgRed(msg[1], err));

                    res.format({
                        html: function(){
                            res.redirect('?error='+ msg[1]);
                        },
                        json: function(){
                            res.json({error: err});
                        }
                    });
                    break;

                default :
                    // upload successful
                    console.log(chalk.bgGreen(msg[2]));
                    console.log(chalk.dim(image));

                    // Set the user image
                    Post.findById(req.params.id, function (err, post){

                        post.preview_image = image.url + image.name;
                        post.save(function(err, post) {
                            switch (true) {

                                case(err != null):
                                    console.log(chalk.bgRed(msg[4], err));

                                    res.format({
                                        html: function () {
                                            res.redirect('?error=' + msg[4]);
                                        },
                                        json: function () {
                                            res.json({error: msg[4]});
                                        }
                                    });
                                    break;

                                default :
                                    console.log(chalk.bgGreen(msg[3]));

                                    res.format({
                                        html: function(){
                                            res.redirect('/post');
                                        },
                                        json: function(){
                                            res.json({success: msg[3]});
                                        }
                                    });
                                    break;
                            }
                        });
                    });
                    break;
            }
        });
    });