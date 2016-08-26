/**
 * Created by CutmanCometh on 5/13/16.
 */

function Game(wordString){
    this.word = new Word(wordString);
    this.incorrectGuesses = 0;
    this.guessedLetters = [];
}

Game.MAX_INCORRECT_GUESSES = 6;

Game.prototype.guessLetter = function (letter) {
    if(!letter || !/^[a-z]$/.test(letter))
        throw new Error("Oops. You called Game.guessLetter() with an invalid input.");

    this.guessedLetters.push(letter);

    var isCorrect = this.word.guessLetter(letter) > 0;
    if(!isCorrect) this.incorrectGuesses++;

    return isCorrect;
};

Game.prototype.isWon = function(){
    return this.word.getMask().indexOf(false) === -1;
};

Game.prototype.isLost = function(){
    return this.incorrectGuesses >= Game.MAX_INCORRECT_GUESSES;
};

Game.prototype.getNumberOfGuessesRemaining = function () {
    return Game.MAX_INCORRECT_GUESSES - this.incorrectGuesses;
};

Game.prototype.getGuessedLetters  = function(){
    return this.guessedLetters.slice();
};

Game.prototype.getWordAsString = function(){
    return this.word.getWordAsString();
};