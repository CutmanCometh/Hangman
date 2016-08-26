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
        var letter = $evt.target.innerHTML.toLowerCase();
        
        //if the letter has already been guessed, don't do anything. also don't do anything if the game is over
        if((game.isLost() || game.isWon()) || game.getGuessedLetters().indexOf(letter) >= 0)
            return;

        //disable the letter
        disableLetter(letter);

        var isGuessCorrect = game.guessLetter(letter);

        if(isGuessCorrect){
            //alert('correct');
            correctVibrate();
            playCorrectSound();

            //reveal correct letters
            $('.letter-wrapper.' + letter).addClass('revealed');

            //check if game is won
            if(game.isWon()){
                alert('You win!');
                //TODO win animation or something
                startNewGame();
            }
        }
        else{
            //alert('incorrect');
            incorrectVibrate();
            playIncorrectSound();

            //draw next part of the hangman
            redrawHangman();
            alert('Incorrect. You have ' + game.getNumberOfGuessesRemaining() + " guesses remaining");

            //check if game is lost
            if(game.isLost()){
                alert('You lose!');
                //TODO lose animation or something
                startNewGame()
            }
        }

    };

    var redrawHangman = function(){

    };

    var playCorrectSound = function(){
        //TODO play sound on correct guess
    };

    var playIncorrectSound = function(){
        //TODO play sound on incorrect guess
    };

    var redrawCanvas = function(){
        //TODO Hangman.redrawCanvas();
    };

    var correctVibrate = function(){
        //navigator.vibrate([30, 40, 30, 40, 30, 40, 30, 40, 30]);
        //navigator.vibrate([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
        //navigator.vibrate([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
        navigator.vibrate(75);
    };

    var incorrectVibrate = function(){
        navigator.vibrate(700);
    };

    var getRandomWordString = function(){
        return "testing";
    };
    
    var startNewGame = function () {
        game = new Game(getRandomWordString());
        
        //clear word-wrapper and add new letters
        $('#word-wrapper').empty();
        
        var $wordWrapper = $('#word-wrapper');

        var wordString = game.getWordAsString().split('');
        
        wordString.forEach(function(element, index, string){
            var classString = "letter-wrapper " + element;
            $('<div></div>').addClass('letter-box').append([
                "<span class='" + classString + "'>" + element + "</span>",
                "<div class='letter-hider'></div>"
            ]).appendTo($wordWrapper);
        });
        
        $('.keyboard-key').removeClass('disabled');
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