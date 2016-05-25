'use strict';

angular.module('renmin.post.create', [])

    .controller('postCreateCtrl', function($scope, $routeParams, $http, $apiProvider) {

        // Variables
        $scope._URL = $apiProvider.post;
        $scope.post = null;

        // POST post
        $scope.create = function(){
            $http.post($scope._URL, $scope.post)
                .success(function (res) {
                    console.log(res);
                    $scope.post = res;

                    window.location.assign("#/post")
                });
        };

    });