'use strict';

angular.module('renmin.post.edit', [])

    .controller('postEditCtrl', function($scope, $routeParams, $http, $apiProvider) {

        // Variables
        $scope._URL = $apiProvider.post +'/'+ $routeParams.id;
        $scope.post = null;

        // GET post
        $scope.get = function(){
            $http.get($scope._URL)
                .success(function (res) {
                    $scope.post = res;
                });
        };

        // PUT post
        $scope.update = function(){
            $http.put($scope._URL, $scope.post)
                .success(function(res, status) {
                    console.log(res);
                    window.location.assign("#/post")
                })
        };

        // DELETE post
        $scope.delete = function(){
            $http.delete($scope._URL, $scope.post)
                .success(function(res, status) {
                    console.log(res);
                    window.location.assign("#/post")
                })
        };

        // Get post
        $scope.get();
    });