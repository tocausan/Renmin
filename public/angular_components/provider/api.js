'use strict';

angular.module('renmin.api', [])

    /**
     * Set api provider
     */
    .provider("$apiProvider", [function () {
        // Set host
        var apiHost = window.location.origin +'/api';

        // Set URLs
        var url = {
            // home
            home:        apiHost+'/home',
            // session
            session:        apiHost+'/session',
            // sign
            signin:         apiHost+'/sign/in',
            // log
            login:          apiHost+'/log/in',
            logout:         apiHost+'/log/out',
            // profile
            profile:                apiHost+'/profile',
            profileEdit:            apiHost+'/profile/edit',
            profileEditAvatar:      apiHost+'/profile/edit-avatar',
            profileEditPassword:    apiHost+'/profile/edit-password',
            // user
            userId:         apiHost+'/user/id',
            userEditId:     apiHost+'/user/edit',
            // post
            post:           apiHost+'/post'
        };

        this.$get = [function () {
            return url;
        }];
    }]);
