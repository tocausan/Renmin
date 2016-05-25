/**
 * Package requirement
 */

var chalk = require('chalk'),
    mongoose = require('mongoose'),
    passwordHash = require('password-hash');


/**
 * Models
 */

var newsletter = require('./models/newsletter'),

    user = require('./models/user'),
    userPassword = require('./models/user-password'),

    post = require('./models/post'),
    postCategory = require('./models/post-category'),
    postContent = require('./models/post-content'),
    postContentType = require('./models/post-content-type'),

    chatMessage = require('./models/chat-message');



/**
 * Database connection
 */

var DB_PATH = 'mongodb://localhost/renmin';

mongoose.connect(DB_PATH, function(err) {
    if (err) throw err;
});


// Total users
mongoose.model('user').find({}, function (err, res){
    console.log(chalk.dim('Total users: '+ res.length));
});



/**
 * Root user (Delete it on production)
 */
var Newsletter = mongoose.model('newsletter'),
    User = mongoose.model('user'),
    UserPassword = mongoose.model('user-password'),
    PostCategory = mongoose.model('post-category');

var rootUser = {
    email: 'tocausan@gmail.com',
    username: 'root',
    firstname: 'root',
    lastname: 'root',
    status: 3,
    confirmed: true,
    password: passwordHash.generate('root')
};

User.findOne({email: rootUser.email}, function (err, checkEmail) {
    User.findOne({username: rootUser.username}, function (err, checkUsername) {

        switch (true) {
            case(checkEmail != null):
                console.log(chalk.inverse('Root email already exist.'));
                console.log(chalk.dim(user));
                break;

            case(checkUsername != null):
                console.log(chalk.inverse('Root username already exist.'));
                console.log(chalk.dim(user));
                break;

            default :
                // Create user
                var r = new User;
                r.email = rootUser.email;
                r.username = rootUser.username;
                r.firstname = rootUser.firstname;
                r.lastname = rootUser.lastname;
                r.status = rootUser.status;
                r.confirmed = rootUser.confirmed;
                r.save(function (err, lol) {
                    if (err) console.log(chalk.bgRed(err));
                    else console.log(chalk.bgGreen('Root user created.'));

                    User.findOne({username: rootUser.username}, function (err, user) {

                        console.log(chalk.inverse(user));
                        // Create password
                        var p = new UserPassword;
                        p.user = user._id;
                        p.password = rootUser.password;
                        p.save(function (err, lol) {
                            if (err) console.log(chalk.bgRed(err));
                            else console.log(chalk.bgGreen('Root user password created.'));
                        });
                    });
                });
                break;
        }
    });
});


/**
 * Newsletter
 */
Newsletter.findOne({email: rootUser.email}, function (err, checkEmail){
    switch (true) {
        case(checkEmail != null):
            console.log(chalk.inverse('Root newsletter already exist.'));
            console.log(chalk.dim(user));
            break;

        default :
            // Create newsletter
            var n = new Newsletter;
            n.email = rootUser.email;
            n.save(function (err, lol) {
                if (err) console.log(chalk.bgRed(err));
                else console.log(chalk.bgGreen('Root newsletter created.'));
            });
            break;
    }
});


/**
 * Post categories
 */
var postCategory = {
    name: 'Home',
    url_name: 'home',
    description: 'Homepage posts.',
    display: true,
    posts: []
};

PostCategory.findOne({name: postCategory.name}, function(err, checkPostCategory){
    switch (true) {
        case(checkPostCategory != null):
            console.log(chalk.inverse(postCategory.name +' post category already exist.'));
            console.log(chalk.dim(user));
            break;

        default :
            // Create home post category
            var p = new PostCategory;
            p.name = postCategory.name;
            p.url_name = postCategory.url_name;
            p.description = postCategory.description;
            p.display = postCategory.display;
            p.save(function (err, lol) {
                if (err) console.log(chalk.bgRed(err));
                else console.log(chalk.bgGreen(postCategory.name +' post category created.'));
            });
            break;
    }
});
