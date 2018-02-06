(function() {
    'use strict';

    angular.module('main')
        .directive('dcePageMeta', dcePageMeta);

    dcePageMeta.$inject = ['$rootScope', '$timeout'];

    function dcePageMeta($rootScope, $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var meta;

                function listener(event, toState) {
                    if (toState.data && toState.data[element.attr('name')]) {
                        meta = toState.data[element.attr('name')];
                    } else {
                        meta = '';
                    }

                    setMeta(meta);
                }

                function setMeta(meta) {
                    $timeout(function() {
                        element.attr('content', meta);
                    });
                }

                $rootScope.$on('$stateChangeStart', listener);
                $rootScope.$on('change-meta', listener);
            }
        };
    }
})();
