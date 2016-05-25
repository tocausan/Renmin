'use strict';

angular.module('renmin.post.index', [
    'renmin.post.create',
    'renmin.post.show',
    'renmin.post.edit'
])

    .controller('postIndexCtrl', function($scope, $http, $apiProvider) {

        // Variables
        $scope._URL = $apiProvider.post;
        $scope.posts = null;

        // GET posts index
        $scope.get = function(){
            $http.get($scope._URL)
                .success(function (res) {
                    $scope.posts = res;
                });
        };

        // Get post
        $scope.get();
    });