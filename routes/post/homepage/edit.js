'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    gm = require('gm'),
    mongoose = require('mongoose'),
    PostHomepage = mongoose.model('post-homepage');

module.exports = router;


// Homepage post middelware to validate id
router.param('id', function(req, res, next, id) {

    PostHomepage.findById(id, function (err, id){
        if (err) {
            console.log(err);

            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function () {
                    res.redirect("/post/homepage");
                },
                json: function(){
                    res.json({message : err.status  + ' ' + err});
                }
            });
            console.log('No post !')
        } else {
            req.id = id;
            next();
        }
    });
});


// Edit homepage post by id
router.route('/id/:id')

    .get(function(req, res) {

        PostHomepage.findById(req.params.id, function (err, post) {

            res.format({
                html: function () {
                    res.render('post/homepage/edit', {
                        auth: req.session.auth,
                        title: 'Homepage post edit',
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

        // get post
        PostHomepage.findById(req.params.id, function (err, post) {

            switch (true){

                case(req.body.title != post.title):

                    // Exist error
                    PostHomepage.findOne({ 'title': req.body.title }, function (err, exist) {
                        if (exist) {
                            var error = 'Username already exist.';
                            console.log(error);
                            res.format({
                                html: function () {
                                    res.redirect(
                                        '?error=' + error +
                                        'title=' + req.body.title +
                                        'text=' + req.body.text
                                    );
                                }
                            });
                        }
                    });
                    break;

                default :


                    break;

            }


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



