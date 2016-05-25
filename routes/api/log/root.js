'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router();

module.exports = router;


router.get('/', function(req, res, next) {
    // activate/deactivate angular
    switch (req.query.angular){

        case('false'):
            console.log(chalk.inverse('Angular deactivate'));
            req.session.angular = false;

            // redirect
            res.redirect('/');
            break;

        case('true'):
            console.log(chalk.inverse('Angular activated'));
            req.session.angular = true;

            // redirect
            res.redirect('/');
            break;

        default :
            req.session.angular = true;
            break;
    }

    res.format({
        html: function(){
            res.redirect("/log/in?redirect="+ req.query.redirect);
        },
        son: function(){
            res.json({message:'API/log'});
        }
    });
});