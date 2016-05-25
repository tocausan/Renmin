'use strict';

angular.module('renmin.user.create', [])

    .controller('userCreateCtrl', function($scope, $routeParams, $http, $apiProvider) {

        // Variables
        $scope.URL = $apiProvider.user;
        $scope.user = null;

        // GET user
        $scope.create = function(){
            $http.post($scope.URL, $scope.user)
                .success(function (res) {
                    console.log(res);
                    $scope.user = res;

                    window.location.assign("#/user")
                });
        };

    });