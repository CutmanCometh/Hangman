/**
 * Created by CutmanCometh on 5/11/16.
 */

/**
 * Main traffic-cop for the app
 * @constructor
 */
var Hangman = (function () {

    var keyTapped = function($evt){
        var letter = $evt.target.innerText.toLowerCase();
    };

    var getRandomWordString = function(){
        return "testing";
    };

    return {

        keyTapped : keyTapped
    };
})();

//TODO Game.js class