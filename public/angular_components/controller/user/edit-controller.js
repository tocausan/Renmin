'use strict';

angular.module('renmin.user.edit', [])

    .controller('userEditCtrl', function($scope, $routeParams, $http, $apiProvider) {

        // Variables
        $scope.URL = $apiProvider.user +'/'+ $routeParams.id;
        $scope.user = null;

        // GET user
        $scope.get = function(){
            $http.get($scope.URL)
                .success(function (res) {
                    $scope.user = res;
                });
        };

        // PUT user
        $scope.update = function(){
            $http.put($scope.URL, $scope.user)
                .success(function(res, status) {
                    console.log(res);
                    window.location.assign("#/user")
                })
        };

        // DELETE user
        $scope.delete = function(){
            $http.delete($scope.URL, $scope.user)
                .success(function(res, status) {
                    console.log(res);
                    window.location.assign("#/user")

                })
        };

        // Get user
        $scope.get();

    });