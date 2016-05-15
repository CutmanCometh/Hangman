/**
 * Created by CutmanCometh on 5/11/16.
 */

/**
 * Main traffic-cop for the app
 * @constructor
 */
var Hangman = (function ($) {
    
    var game = null;

    var keyTapped = function($evt){
        var letter = $evt.target.innerText.toLowerCase();
        
        //disable the letter
        disableLetter(letter);

        //if the letter has already been guess, don't do anything
        if(game.getGuessedLetters().indexOf(letter) >= 0)
            return;

        var isGuessCorrect = game.guessLetter(letter);

        if(isGuessCorrect){
            //alert('correct');
            correctVibrate();

        }
        else{
            //alert('incorrect');
            incorrectVibrate();
        }

    };

    var redrawCanvas = function(
        //TODO Hangman.redrawCanvas();
    ){};

    var correctVibrate = function(){
        navigator.vibrate([40, 60, 40, 60, 60]);
    };

    var incorrectVibrate = function(){
        navigator.vibrate(700);
    };

    var getRandomWordString = function(){
        return "testing";
    };
    
    var startNewGame = function () {
        game = new Game(getRandomWordString());
    };
    
    var disableLetter = function (letter) {
        $('#' + letter).addClass("disabled");
    };

    return {
        startNewGame : startNewGame,
        keyTapped : keyTapped
    };
    
    
})($);

//TODO Game.js class