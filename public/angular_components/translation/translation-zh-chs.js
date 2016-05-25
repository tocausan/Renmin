'use strict';

angular.module('renmin.translation-zh-chs', [])

    .config(function ($translateProvider) {
        $translateProvider.translations('zh-chs', {
            Hello:      '你好',

            Intro:          '介绍',
            About:          '关于',

            Intro_part_1:   '欢迎 Multinlingual Angular 应用.',
            Intro_part_2:   '这个程序的目的是提供一个国际化服务.',

            About_part_1:   '这个程序是基于“angular-seed”结构，它使用“angular-route”路由和“angular-translate”的（Pascalprecht）翻译. ' +
            '这些名称指的是“Bower”套餐.',
            About_part_2:   '“Foundation”用来提供一个简单而漂亮的用户界面.',
        });
    });