(function() {
    'use strict';

    angular.module('main')
        .controller('FooterController', FooterController);

    FooterController.$inject = [];

    function FooterController() {
        var self = this;

        self.value = "Footer value";

        activate();

        function activate() {}
    }
})();
