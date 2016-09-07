/**
 * Created by CutmanCometh on 5/13/16.
 * Initialize the game.
 */

(function(){


    // console.log("width:", window.innerWidth);
    // console.log("height:", window.innerHeight);

    //attach listeners
    $('.keyboard-key').click(Hangman.keyTapped);
    Hangman.startNewGame();

    //set up drawing loop

    
    //start new game


    //testing animation
    /*setTimeout(function(){
        $('.letter-wrapper.i').addClass('revealed');
    },1000);

    setTimeout(function(){
        $('.letter-wrapper.g').addClass('revealed');
    },2000);*/

})($);