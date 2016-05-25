'use strict';

angular.module('renmin.post.show', [])

    .controller('postShowCtrl', function($scope, $routeParams, $http, $apiProvider) {

        // Variables
        $scope._URL = $apiProvider.post +'/'+ $routeParams.id;
        $scope.post = null;

        // GET get
        $scope.get = function(){
            $http.get($scope._URL)
                .success(function (res) {
                    $scope.post = res;
                });
        };

        // Get post
        $scope.get();
    });