'use strict';

angular.module('renmin.base', ['pascalprecht.translate'])

    .controller('baseCtrl', function($scope, $translate, $apiProvider) {

        // change language translation
        $scope.changeLanguage = function (key) {
            $translate.use(key);
        };


        // watch language translation
        $scope.$watch('language',function(){
            $translate.use($scope.language);
        });


        // auth
        $scope.log = {
            logged: localStorage.getItem("renmin.auth.logged"),
            user: {
                username: localStorage.getItem("renmin.auth.username"),
                password: localStorage.getItem("renmin.auth.password")
            }
        };

    });