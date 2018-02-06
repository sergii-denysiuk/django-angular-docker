(function() {
    'use strict';

    angular.module('main')
        .directive('dcePageTitle', dcePageTitle);

    dcePageTitle.$inject = ['$rootScope', '$timeout'];

    function dcePageTitle($rootScope, $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var prefix = 'dce | ';
                var defaultTitle = 'DCE';

                function listener(event, toState) {
                    var title;

                    if (toState.data && toState.data.title) {
                        title = toState.data.title;
                    } else {
                        title = defaultTitle;
                    }

                    setTitle(title);
                }

                function setTitle(title) {
                    $timeout(function() {
                        element.text(prefix + title);
                    });
                }

                $rootScope.$on('$stateChangeStart', listener);
                $rootScope.$on('change-title', listener);
            }
        };
    }
})();
