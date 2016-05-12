/**
 * Created by CutmanCometh on 5/11/16.
 */

/**
 * Main traffic-cop for the app
 * @constructor
 */
var Hangman = (function () {

    /**
     * Doubles the numbers
     * @param number The number to double
     */
    var doubleIt = function(number){
        return number * 2;
    };

    return {

        doubleIt : doubleIt
    };
})();

//TODO Game.js class