(function(config) {
    'use strict';

    angular.module('main.services', [
            'ngResource',
            'main.constants'
        ])
        .factory('langInterceptor', langInterceptor)
        .factory('lodashService', lodashService)
        .factory('momentSrvc', momentSrvc)
        .factory('someDataSrvc', someDataSrvc)
        .factory('someSrvc', someSrvc);

    langInterceptor.$inject = [];

    function langInterceptor() {
        return {
            request: function(config) {
                config.headers["Accept-Language"] = 'EN';
                return config;
            }
        };
    }

    lodashService.$inject = [];

    function lodashService() {
        return window._;
    }

    momentSrvc.$inject = [];

    function momentSrvc() {

        var DEFAULT_FORMAT = 'DD.MM.YYYY';

        /*
         * Get date formatted to default look.
         */
        function dateDefaultFormat(date) {
            return date.format(DEFAULT_FORMAT);
        }

        /*
         * Get date formatted to default look.
         */
        function stringDefaultFormat(str) {
            return moment(str).format(DEFAULT_FORMAT);
        }

        /**
         * Check if date is workday.
         */
        function isWorkday(date) {
            return date.isoWeekday() !== 6 && // exclude Saturday (Weekend)
                date.isoWeekday() !== 7; // exclude Sunday (Weekend)
        }

        /**
         * Add workdays
         */
        function addWorkdays(date, days) {
            var d = date.clone().add(Math.floor(days / 5) * 7, 'd');
            var remaining = days % 5;

            while (remaining) {
                d.add(1, 'd');
                if (isWorkday(d)) {
                    --remaining;
                }
            }

            return dateDefaultFormat(d);
        }

        /**
         * Subtract workdays
         */
        function subtractWorkdays(date, days) {
            var d = date.clone().subtract(Math.floor(days / 5) * 7, 'd');
            var remaining = days % 5;

            while (remaining) {
                d.subtract(1, 'd');
                if (isWorkday(d)) {
                    --remaining;
                }
            }

            return dateDefaultFormat(d);
        }

        return {
            moment: moment,
            dateDefaultFormat: dateDefaultFormat,
            stringDefaultFormat: stringDefaultFormat,
            isWorkday: isWorkday,
            addWorkdays: addWorkdays,
            subtractWorkdays: subtractWorkdays
        };
    }

    someDataSrvc.$inject = ['$resource'];

    function someDataSrvc($resource) {
        return $resource(config.api + '/api/some/:pk/', { pk: '@pk' }, {
            get: {
                method: 'GET',
            },
            list: {
                method: 'GET',
                params: {
                    page: '@page'
                }
            },
            create: {
                method: 'POST',
            },
            update: {
                method: 'PATCH',
            },
            delete: {
                method: 'DELETE'
            }
        });
    }

    someSrvc.$inject = [];

    function someSrvc() {

        return {
            someFunction: someFunction,
        };

        function someFunction() {
            console.log('evaluate someFunction');
        }
    }
})(window.config);
