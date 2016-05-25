'use strict';

angular.module('renmin.translation-en-us', [])

    .config(function ($translateProvider) {
        $translateProvider.translations('en-us', {
            Hello:      'Hello',

            Intro:          'Intro',
            About:          'About',

            Intro_part_1:   'Welcome to Multinlingual Angular App.',
            Intro_part_2:   'This application aims to provide an international service.',

            About_part_1:   'This application is based on "angular-seed" architecture and it\'s using "angular-route" for routing and "angular-translate" (Pascal Precht) for translation. ' +
            'Those names are referring to "Bower" packages.',
            About_part_2:   '"Foundation" is also used to provide an easy and pretty user interface.',
        });
    });