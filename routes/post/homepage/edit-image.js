'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    gm = require('gm'),
    mongoose = require('mongoose'),
    PostHomepage = mongoose.model('post-homepage');

module.exports = router;


router.route('/id/:id')

    // GET homepage/id/:id
    .get(function(req, res) {

        PostHomepage.findById(req.params.id, function (err, post) {

            res.format({
                html: function () {
                    res.render('post/homepage/image', {
                        auth: req.session.auth,
                        title: 'Post image',
                        post: post,
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function () {
                    res.json(post);
                }
            });
        })
    })

    // POST homepage image (_method: POST, PUT, DELETE)
    .post(function(req, res) {

        /*
         * # 1- Create the post data and fill it with title, text, style
         * 2- Retrieve the post and add the image
         * */

        // Set image
        PostHomepage.findById(req.params.id, function (err, post) {

            // setup
            var image = {
                path: 'http://'+ req.get('host') +'/assets/uploads/posts/homepage/',
                name: req.params.id
            };
            // set storage
            var storage =   multer.diskStorage({

                // destination
                destination: function (req, file, callback) {
                    callback(null, 'public/assets/uploads/posts/homepage/');
                },

                // filename
                filename: function (req, file, callback) {

                    // set mimetype restriction
                    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
                        if(file.mimetype == 'image/jpeg') image.mimetype = '.jpg';
                        if(file.mimetype == 'image/png') image.mimetype = '.png';
                        // set image name
                        image.name += image.mimetype;
                        callback(null, image.name);
                    } else {
                        console.log(chalk.inverse('Image must be .jpg and .png.'));
                        return false;
                    }
                }
            });

            // upload function
            var uploadImage = multer({
                storage : storage,
                limits: { fileSize: 1 * 1000 * 1000 }
            }).single('image');



            // upload
            uploadImage(req,res,function(err) {
                console.log(chalk.dim('uploadImage'));
                if(err) {
                    console.log(chalk.inverse('Error uploading file.'));
                    console.log(chalk.dim(err));

                    // redirect
                    res.redirect('?error='+ err);

                } else {
                    console.log(chalk.dim('save'));
                    console.log(chalk.dim('image name: '+ image.name));

                    console.log(chalk.inverse(image.path + image.name));



                    // save
                    post.image = image.path + image.name;
                    post.save(function(err, user) {
                        if(err) return console.log(chalk.bgRed(err));
                    });

                    console.log(chalk.inverse('File is uploaded.'));

                    var success = 'Post uploaded successfully.';
                    res.format({
                        html: function(){
                            res.redirect('/post/homepage?success='+ success);
                        }
                    });
                }
            });
        });

    });












