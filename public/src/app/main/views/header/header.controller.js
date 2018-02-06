(function() {
    'use strict';

    angular.module('main')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = [];

    function HeaderController() {
        var self = this;

        self.value = "header value";

        activate();

        function activate() {}
    }
})();
