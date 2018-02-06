(function() {
    'use strict';

    angular.module('main')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = [];

    function LayoutController() {
        var self = this;

        activate();

        function activate() {}
    }
})();
