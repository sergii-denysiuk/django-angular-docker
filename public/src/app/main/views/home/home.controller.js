(function() {
    'use strict';

    angular.module('main')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {
        var self = this;

        self.value = "Content value";

        activate();

        function activate() {}
    }
})();
