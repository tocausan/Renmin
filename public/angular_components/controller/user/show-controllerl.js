'use strict';

angular.module('renmin.user.show', [])

    .controller('userShowCtrl', function($scope, $routeParams, $http, $apiProvider) {

        // Variables
        $scope.URL = $apiProvider.user +'/'+ $routeParams.id;
        $scope.user = null;

        // GET user
        $scope.refresh = function(){
            $http.get($scope.URL)
                .success(function (res) {
                    $scope.user = res;
                    console.log($scope.user)
                });
        };
        $scope.refresh();
    });