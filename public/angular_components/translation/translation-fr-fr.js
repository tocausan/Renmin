'use strict';

angular.module('renmin.translation-fr-fr', [])

    .config(function ($translateProvider) {
        $translateProvider.translations('fr-fr', {
            Hello:          'Bonjour',

            Intro:          'Intro',
            About:          'A propos',

            Intro_part_1:   'Bienvenue sur Multinlingual Angular App.',
            Intro_part_2:   'Cette application est destinée à offrir un service international.',

            About_part_1:   'Cette application est basée sur l\'architecture d\'"angular-seed" et utilisant "angular-route" pour le routing et "angular-translate" (Pascal Precht) pour la traduction. ' +
            'Ces noms font références aux paquets "Bower".',
            About_part_2:   '"Foundation" est aussi utilisé afin de faciliter la rapide mise en place d\'une interface utilisateur agréable.',
        });
    });