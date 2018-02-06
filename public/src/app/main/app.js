(function(config) {
    'use strict';

    angular.module('main', [
            'ui.router',
            'ngResource',

            'main.services',
            'main.constants',
        ])
        .config(csrfToken)
        .config(html5ModeURLs)
        .config(hashBangURLs)
        .config(stripTrailingSlashes)
        .config(uiRouting);

    csrfToken.$inject = ['$httpProvider'];

    function csrfToken($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }

    html5ModeURLs.$inject = ['$locationProvider'];

    function html5ModeURLs($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    hashBangURLs.$inject = ['$locationProvider'];

    function hashBangURLs($locationProvider) {
        $locationProvider.hashPrefix('!');
    }

    stripTrailingSlashes.$inject = ['$resourceProvider'];

    function stripTrailingSlashes($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }

    uiRouting.$inject = ['$urlRouterProvider', '$stateProvider'];

    function uiRouting($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('layout', {
                abstract: true,
                views: {
                    'content@': {
                        templateUrl: 'app/main/views/layout/layout.html',
                        controller: 'LayoutController',
                        controllerAs: 'ctrl'
                    },
                    'header@layout': {
                        templateUrl: 'app/main/views/header/header.html',
                        controller: 'HeaderController',
                        controllerAs: 'ctrl',
                    },
                    'footer@layout': {
                        templateUrl: 'app/main/views/footer/footer.html',
                        controller: 'FooterController',
                        controllerAs: 'ctrl',
                    }
                }
            })
            .state('layout.home', {
                url: '/',
                views: {
                    'content@layout': {
                        templateUrl: 'app/main/views/home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'ctrl',
                    }
                },
                data: {
                    title: 'Home page',
                }
            });
    }
})(window.config);
