'use strict';

angular.module('renmin.translation', [
    'renmin.translation-en-us',
    'renmin.translation-fr-fr',
    'renmin.translation-zh-chs',
])

    .value('version', '0.1')

    .config(function ($translateProvider) {
        $translateProvider.preferredLanguage('fr-fr');
        $translateProvider.useSanitizeValueStrategy('escaped');
    });
