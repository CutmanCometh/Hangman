/**
 * Created by CutmanCometh on 5/11/16.
 */

/**
 * Main traffic-cop for the app
 * @constructor
 */
var Hangman = (function ($) {

    //TODO keep track of wins and losses
    //TODO persist data across browser reloads

    var headDrawTime = 200;
    var bodyDrawTime = 120;
    var armDrawTime = 65;
    var legDrawTime = 65;

    var vibrateIsAThing = !!navigator.vibrate;

    var game = null;

    //resize canvas for best fit vertically and horizontally
    var canvasElement = $("#canvas")[0] || {getContext : function(){return {closePath : function(){}, fillRect : function(){}, beginPath : function(){}}}};//need mock object or karma freaks out
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var keyboardHeight = $('#keyboard').outerHeight();
    var wordHeight = $('#word-container').outerHeight();
    var availableHeight = screenHeight - (keyboardHeight + wordHeight + 60);
    var canvasSize = (availableHeight < screenWidth ? availableHeight : screenWidth) - 20;
    canvasElement.width = canvasSize;
    canvasElement.height = canvasSize

    var canvas = canvasElement.getContext('2d');
    canvas.strokeStyle = 'black';
    canvas.fillStyle = "white";





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
                //TODO win vibration
            }
        }
        else{
            incorrectVibrate();
            playIncorrectSound();

            //draw next part of the hangman
            updateHangman();

            //check if game is lost
            if(game.isLost()){
                revealWord();
                setTimeout(function(){
                    alert('You lose!');
                    startNewGame()
                }, 1200);
                //TODO lose animation or something
                //TODO lose vribration
            }
        }

    };

    var drawHead = function(lastDrawTime, drawnPercentage){
        var thisDrawTime = Date.now();
        var elapsedTime = thisDrawTime - lastDrawTime;
        var percentageToDraw = elapsedTime / headDrawTime;
        var endDrawPercent = drawnPercentage + percentageToDraw;
        var twoPi = 2 * Math.PI;
        canvas.arc(centerX, centerY, radius, twoPi * (drawnPercentage + .25), twoPi * (endDrawPercent + .25), false);
        canvas.stroke();

        if(endDrawPercent <= 1){
            window.requestAnimationFrame(function(){drawHead(thisDrawTime, endDrawPercent);});
        }
    };

    var drawBody = function(lastDrawTime, drawnPercentage){
        var thisDrawTime = Date.now();
        var elapsedTime = thisDrawTime - lastDrawTime;
        var percentageToDraw = elapsedTime / bodyDrawTime;
        var endDrawPercent = drawnPercentage + percentageToDraw;

        canvas.moveTo(centerX, centerY + radius + ((canvasSize * (11/30)) * drawnPercentage));//starting at the center of the head, move down by the radius of the head
        canvas.lineTo(centerX, centerY + radius + ((canvasSize * (11/30)) * endDrawPercent));
        canvas.stroke();

        if(endDrawPercent <= 1){
            window.requestAnimationFrame(function(){drawBody(thisDrawTime, endDrawPercent);});
        }
    };

    var drawRightArm = function(lastDrawTime, drawnPercentage){
        var thisDrawTime = Date.now();
        var elapsedTime = thisDrawTime - lastDrawTime;
        var percentageToDraw = elapsedTime / armDrawTime;
        var endDrawPercent = drawnPercentage + percentageToDraw;

        canvas.moveTo(centerX - ((canvasSize / 6) * drawnPercentage), centerY + radius + ((canvasSize / 6) * drawnPercentage));
        canvas.lineTo(centerX - ((canvasSize / 6) * endDrawPercent), centerY + radius + ((canvasSize / 6) * endDrawPercent));
        canvas.stroke();

        if(endDrawPercent <= 1){
            window.requestAnimationFrame(function(){drawRightArm(thisDrawTime, endDrawPercent);});
        }
    };

    var drawLeftArm = function(lastDrawTime, drawnPercentage){
        var thisDrawTime = Date.now();
        var elapsedTime = thisDrawTime - lastDrawTime;
        var percentageToDraw = elapsedTime / armDrawTime;
        var endDrawPercent = drawnPercentage + percentageToDraw;

        canvas.moveTo(centerX + ((canvasSize / 6) * drawnPercentage), centerY + radius + ((canvasSize / 6) * drawnPercentage));
        canvas.lineTo(centerX + ((canvasSize / 6) * endDrawPercent), centerY + radius + ((canvasSize / 6) * endDrawPercent));
        canvas.stroke();

        if(endDrawPercent <= 1){
            window.requestAnimationFrame(function(){drawLeftArm(thisDrawTime, endDrawPercent);});
        }
    };

    var drawRightLeg = function(lastDrawTime, drawnPercentage){
        var thisDrawTime = Date.now();
        var elapsedTime = thisDrawTime - lastDrawTime;
        var percentageToDraw = elapsedTime / legDrawTime;
        var endDrawPercent = drawnPercentage + percentageToDraw;

        canvas.moveTo(centerX - ((canvasSize / 6) * drawnPercentage), centerY + radius + (canvasSize * (12/30)) + ((canvasSize / 6) * drawnPercentage));
        canvas.lineTo(centerX - ((canvasSize / 6) * endDrawPercent), centerY + radius + (canvasSize * (12/30)) + ((canvasSize / 6) * endDrawPercent));
        canvas.stroke();

        if(endDrawPercent <= 1){
            window.requestAnimationFrame(function(){drawRightLeg(thisDrawTime, endDrawPercent);});
        }
    };

    var drawLeftLeg = function(lastDrawTime, drawnPercentage){
        var thisDrawTime = Date.now();
        var elapsedTime = thisDrawTime - lastDrawTime;
        var percentageToDraw = elapsedTime / legDrawTime;
        var endDrawPercent = drawnPercentage + percentageToDraw;

        canvas.moveTo(centerX + ((canvasSize / 6) * drawnPercentage), centerY + radius + (canvasSize * (12/30)) + ((canvasSize / 6) * drawnPercentage));
        canvas.lineTo(centerX + ((canvasSize / 6) * endDrawPercent), centerY + radius + (canvasSize * (12/30)) + ((canvasSize / 6) * endDrawPercent));
        canvas.stroke();

        if(endDrawPercent <= 1){
            window.requestAnimationFrame(function(){drawLeftLeg(thisDrawTime, endDrawPercent);});
        }
    };

    var updateHangman = function(){
        //TODO draw each piece in segments, so it look hand-drawn
        switch (game.getNumberOfBadGuesses()){
            case 1:
                //draw head
                canvas.lineWidth = 2;
                window.requestAnimationFrame(function(){drawHead(Date.now(), 0);});
                break;
            case 2:
                //draw body
                canvas.lineWidth = 3;
                window.requestAnimationFrame(function(){drawBody(Date.now(), 0);});
                break;
            case 3:
                //draw right arm (stage right)
                window.requestAnimationFrame(function(){drawRightArm(Date.now(), 0);});
                break;
            case 4:
                //draw left arm (stage left)
                window.requestAnimationFrame(function(){drawLeftArm(Date.now(), 0);});
                break;
            case 5:
                //draw right leg (stage right)
                window.requestAnimationFrame(function(){drawRightLeg(Date.now(), 0);});
                break;
            case 6:
                //draw left leg (stage left)
                window.requestAnimationFrame(function(){drawLeftLeg(Date.now(), 0);});
                break;
            default:
                alert("Panic! This should never happen! game.getNumberOfBadGuesses() returned a number other than 1-6 inside Hangman.updateHangman()");
        }

        //TODO clean up the look of the hangman
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
        if(vibrateIsAThing)navigator.vibrate(75);
    };

    var incorrectVibrate = function(){
        if(vibrateIsAThing)navigator.vibrate(700);
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