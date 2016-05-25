'use strict';

angular.module('renmin.log.out', [])

    .controller('logOutCtrl', function($scope, $http, $apiProvider, $interval) {

        // log middelware
        $http.get($apiProvider.session)
            .success(function (res) {
                if(res.auth){
                    console.log(res);
                    window.location = '#/profile';
                }
            });


        // auth
        $scope.auth;

        $scope.login = function(){
            $http.post($apiProvider.log, $scope.auth)
                .success(function (res) {
                    console.log(res);
                    window.location = '#/profile';
                });
        };
    });