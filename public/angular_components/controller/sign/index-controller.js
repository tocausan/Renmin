'use strict';

angular.module('renmin.sign.in', [])

    .controller('signInCtrl', function($scope, $http, $apiProvider, $interval) {

        // User
        $scope.users;

        // GET users index
        $scope.refresh = function(){
            $http.get($apiProvider.user)
                .success(function (res) {
                    $scope.users = res;
                });
        };

        // Refresh every 30s
        $scope.refresh();
        $interval(function() {
            $scope.refresh();
        }, 30000);
    });