'use strict';

angular.module('renmin.view2', ['ngRoute'])

    .controller('view2Ctrl', function($scope) {

        /**
         * Login
         */
        $scope.log = {
            password: null,
            in: function(){

                // Password verification
                var password = JSON.parse(localStorage.getItem("myApp.user.security.password"));

                if(password == null){ $scope.log.password = password }  // If no password yet
                if(this.password === password){
                    $scope.loggedin = 1;
                }
                else {
                    $scope.loggedin = 0;
                }
            }
        };



        /**
         * Local variables & Scopes
         */
        $scope.user = {
            profile: {},
            security: {}
        };
        $scope.hasChanged = {};
        var data = {
            profile: {
                getLocalStorage: function(){
                    /**
                     * Parse JSON
                     * Set user profile
                     */
                    $scope.user.profile = JSON.parse(localStorage.getItem("myApp.user.profile"));
                },
                setLocalStorage: function(){
                    /**
                     * Stringify JSON
                     * Set local storage
                     */
                    localStorage.setItem("myApp.user.profile", JSON.stringify($scope.user.profile));
                }
            },
            security: {
                setLocalStorage: function(){
                    /**
                     * Stringify JSON
                     * Set local storage
                     */
                    localStorage.setItem("myApp.user.security.password", JSON.stringify($scope.user.security.newPassword));
                    $scope.user.security = {}
                }
            }
        };

        /**
         * User profile watch
         */
        $scope.$watchCollection('user.profile', function(){
            if(JSON.stringify($scope.user.profile) !== JSON.stringify(JSON.parse(localStorage.getItem("myApp.user.profile")))){
                $scope.hasChanged.userProfile = 1;
            }
            else{
                $scope.hasChanged.userProfile = 0;
            }
        });

        /**
         * User security watch
         */
        $scope.$watchCollection('user.security', function(){
            // Old password verification
            var oldPassword = JSON.parse(localStorage.getItem("myApp.user.security.password"));

            // If no password yet
            if(oldPassword == null){
                $scope.user.security.oldPassword = oldPassword
            }

            if($scope.user.security.oldPassword !== oldPassword){
                $scope.passVerif = 0;
            }
            else{
                $scope.passVerif = 1;
            }

            // New password confirmation
            if($scope.user.security.newPassword !== $scope.user.security.passConf){
                $scope.passConf = 0;
            }
            else{
                $scope.passConf = 1;
            }

            // Password change
            if($scope.passVerif && $scope.passConf){
                $scope.hasChanged.userSecurity = 1;
            }
            else{
                $scope.hasChanged.userSecurity = 0;
            }

        });

        /**
         * Update functions
         */
        $scope.update = {
            profile: function(){
                data.profile.setLocalStorage();
                $scope.hasChanged.userProfile = 0;
            },
            security: function(){
                data.security.setLocalStorage();
                $scope.hasChanged.userSecurity = 0;
            }
        };

        /**
         * Start app
         */
        data.profile.getLocalStorage();
    });