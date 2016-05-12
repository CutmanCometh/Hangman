/**
 * Created by CutmanCometh on 5/11/16.
 */

/**
 * Object representation of a word the user is guessing at.
 * @param word String representation of the word.
 * @constructor
 */
function Word(word){
    this.REVEALED_CHAR = '*';
    this.HIDDEN_CHAR = '-';

    this.wordString = word;
    var wordRevealedMask = [];

    for(var i = 0; i < this.wordString.length; i++){
        wordRevealedMask[i] = false;
    }

    this.wordRevealedMask = wordRevealedMask;
}

Word.prototype.getMask = function(){

    return this.wordRevealedMask.slice();
};

Word.prototype.getMaskString = function(){
    var maskString = "";
    for(var i = 0; i < this.wordRevealedMask.length; i++){
        maskString += this.wordRevealedMask[i] ? this.wordString[i] : "_";
    }
    return maskString;
};

Word.prototype.guessLetter = function(letter){
    if(!/^[a-z]$/.test(letter)){
        throw new Error("Invalid argument to Word.guessLetter()");
    }

    var matches = 0;

    for(var i = 0; i < this.wordRevealedMask.length; i++){
        if(letter === this.wordString[i]) {
            matches++;
            this.wordRevealedMask[i] = letter;
        }
    }

    return matches;
};

