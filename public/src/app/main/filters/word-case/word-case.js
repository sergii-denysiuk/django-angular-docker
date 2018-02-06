(function() {
    'use strict';

    angular.module('main')
        .filter('dceWordCase', dceWordCase);

    dceWordCase.$inject = [];

    /**
     * Slope Declines word in accordance with the number of the word .
     * @param  {Integer} num
     * @param  {Array}   words
     * @return {String}
     *
     * Usage:
     *     var words = ['jabek', 'jabko', 'jabka'];
     *     wordCase(0, words); // jabek
     *     wordCase(1, words); // jabko
     *     wordCase(2, words); // jabka
     *     wordCase(5, words); // jabek
     *     wordCase(10, words); // jabek
     */
    function dceWordCase() {
        return function(words, num) {
            num = Math.abs(num);

            if (num.toString().indexOf('.') > -1) {
                return words[2];
            } else {
                return (
                    num % 10 === 1 && num % 100 !== 11 ? words[1] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? words[2] : words[0]
                );
            }
        };
    }
})();
