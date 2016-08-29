/**
 * Created by CutmanCometh on 5/11/16.
 */

/**
 * Main traffic-cop for the app
 * @constructor
 */
var Hangman = (function ($) {
    
    var game = null;
    var canvasElement = $("#canvas")[0];

    var canvas = canvasElement.getContext('2d');
    canvas.strokeStyle = 'black';
    canvas.fillStyle = "white";



    var canvasSize = 300;

    var centerX = canvasSize / 2;
    var centerY = canvasSize / 6;
    var radius = canvasSize / 7.5;

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
                setTimeout(function(){
                    alert('You win!');
                    startNewGame();
                }, 1200);
                //TODO win animation or something

            }
        }
        else{
            //alert('incorrect');
            incorrectVibrate();
            playIncorrectSound();

            //draw next part of the hangman
            updateHangman();
            //alert('Incorrect. You have ' + game.getNumberOfGuessesRemaining() + " guesses remaining");

            //check if game is lost
            if(game.isLost()){
                revealWord();
                setTimeout(function(){
                    alert('You lose!');
                    startNewGame()
                }, 1200);
                //TODO lose animation or something

            }
        }

    };

    var updateHangman = function(){
        switch (game.getNumberOfBadGuesses()){
            case 1:
                //draw head
                canvas.lineWidth = 2;
                canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                canvas.stroke();
                break;
            case 2:
                //draw body
                canvas.lineWidth = 3;
                canvas.moveTo(centerX, centerY + radius);
                canvas.lineTo(centerX, centerY + radius + (canvasSize * (11/30)));
                canvas.stroke();
                break;
            case 3:
                //draw right arm (stage right)
                canvas.moveTo(centerX, centerY + radius + (canvasSize / 30));
                canvas.lineTo(centerX - (canvasSize / 6), centerY + radius + (canvasSize / 6));
                canvas.stroke();
                break;
            case 4:
                //draw left arm (stage left)
                canvas.moveTo(centerX, centerY + radius + (canvasSize / 30));
                canvas.lineTo(centerX + (canvasSize / 6), centerY + radius + (canvasSize / 6));
                canvas.stroke();
                break;
            case 5:
                //draw right leg (stage right)
                canvas.moveTo(centerX, centerY + radius + (canvasSize * (11/30)));
                canvas.lineTo(centerX - (canvasSize / 6), centerY + radius + (canvasSize / 2));
                canvas.stroke();
                break;
            case 6:
                //draw left leg (stage left)
                canvas.moveTo(centerX, centerY + radius + (canvasSize * (11/30)));
                canvas.lineTo(centerX + (canvasSize / 6), centerY + radius + (canvasSize / 2));
                canvas.stroke();
                break
            default:
                alert("Panic! This should never happen! game.getNumberOfBadGuesses() returned a number other than 1-6 inside Hangman.updateHangman()");
        }

        //TODO clean up the look of the hangman. base the drawing on the size of the canvas
    };

    var clearCanvas = function () {
        canvas.fillRect(0, 0, canvasSize, canvasSize);
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
        return Wordlist.getRandomWord();
    };
    
    var startNewGame = function () {
        canvas.closePath();
        clearCanvas();
        canvas.beginPath();


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

    var revealWord = function(){
        $('.letter-wrapper').addClass('revealed');
    };
    
    var disableLetter = function (letter) {
        $('#' + letter).addClass("disabled");
    };

    return {
        startNewGame : startNewGame,
        keyTapped : keyTapped
    };
    
    
})($);