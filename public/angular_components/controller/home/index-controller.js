'use strict';

angular.module('renmin.home.index', [])

    .controller('homeIndexCtrl', function($scope, $http, $apiProvider, $interval) {

        $scope.posts = [];

        // get homepage posts
        $http.get($apiProvider.home)
            .success(function (res) {
                console.log(res);
                $scope.posts = res;
            });

    });