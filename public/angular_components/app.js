'use strict';

// Declare app level module which depends on views, and components
angular.module('renmin', [
    'ngRoute',
    'pascalprecht.translate',
    'renmin.route',
    //'renmin.route-security',
    'renmin.api',
    'renmin.base',
    'renmin.home.index',
    'renmin.sign.in',
    'renmin.log.in',
    'renmin.profile.index',
    'renmin.user.index',
    'renmin.post.index',
    'renmin.version',
    'renmin.translation'
]);
