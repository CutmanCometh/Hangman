/**
 * Created by CutmanCometh on 5/13/16.
 * Initialize the game.
 */

(function(){
    
    //attach listeners
    $('.keyboard-key').click(Hangman.keyTapped);
    Hangman.startNewGame();

    //set up drawing loop
})($);