'use strict';

angular.module('renmin.route', ['ngRoute'])

    // Set route provider
    .config(['$routeProvider', function($routeProvider) {

        var partialPath = '../angular_components/partial';

        // Ddefault
        $routeProvider.otherwise({redirectTo: '/'});


        // home
        $routeProvider.when('/', {
            templateUrl: partialPath + '/home/index.html',
            controller: 'homeIndexCtrl'
        });


        // sign
        $routeProvider.when('/sign', {
            templateUrl: partialPath + '/sign/in.html',
            controller: 'signInCtrl'
        });


        // log
        $routeProvider.when('/log', {
            templateUrl: partialPath + '/log/in.html',
            controller: 'logInCtrl'
        });
        $routeProvider.when('/log/out', {
            templateUrl: partialPath + '/log/out.html',
            controller: 'logOutCtrl'
        });


        // profile
        $routeProvider.when('/profile', {
            templateUrl: partialPath + '/profile/index.html',
            controller: 'profileIndexCtrl'
        });
        $routeProvider.when('/profile/edit', {
            templateUrl: partialPath + '/profile/edit.html',
            controller: 'profileEditCtrl'
        });


        // user
        $routeProvider.when('/user', {
            templateUrl: partialPath + '/user/index.html',
            controller: 'userIndexCtrl'
        });
        $routeProvider.when('/user/index', {
            templateUrl: partialPath + '/user/index.html',
            controller: 'userIndexCtrl'
        });
        $routeProvider.when('/user/create', {
            templateUrl: partialPath + '/user/create.html',
            controller: 'userCreateCtrl'
        });
        $routeProvider.when('/user/show/:id', {
            templateUrl: partialPath + '/user/show.html',
            controller: 'userShowCtrl'
        });
        $routeProvider.when('/user/edit/:id', {
            templateUrl: partialPath + '/user/edit.html',
            controller: 'userEditCtrl'
        });

        // post
        $routeProvider.when('/post', {
            templateUrl: partialPath + '/post/index.html',
            controller: 'postIndexCtrl'
        });
        $routeProvider.when('/post/index', {
            templateUrl: partialPath + '/post/index.html',
            controller: 'postIndexCtrl'
        });
        $routeProvider.when('/post/create', {
            templateUrl: partialPath + '/post/create.html',
            controller: 'postCreateCtrl'
        });
        $routeProvider.when('/post/show/:id', {
            templateUrl: partialPath + '/post/show.html',
            controller: 'postShowCtrl'
        });
        $routeProvider.when('/post/edit/:id', {
            templateUrl: partialPath + '/post/edit.html',
            controller: 'postEditCtrl'
        });


    }]);
