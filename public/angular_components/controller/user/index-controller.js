'use strict';

angular.module('renmin.user.index', [
    'renmin.user.create',
    'renmin.user.show',
    'renmin.user.edit'
])

    .controller('userIndexCtrl', function($scope, $http, $apiProvider, $interval) {

        // Variables
        $scope.URL = $apiProvider.user;
        $scope.users = null;

        // GET users index
        $scope.get = function(){
            $http.get($scope.URL)
                .success(function (res) {
                    $scope.users = res;
                });
        };

        // Get
        $scope.get();

        // Refresh every 30s
        $interval(function() {
            $scope.get();
        }, 30000);
    });