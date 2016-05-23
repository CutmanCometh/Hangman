describe('Game.js', function () {
    
    it('illegal letter guess throws error', function () {
        var game = new Game('');
        expect(function(){game.guessLetter("foo")}).toThrow(new Error("Oops. You called Game.guessLetter() with an invalid input."));
        expect(function(){game.guessLetter('')}).toThrow(new Error("Oops. You called Game.guessLetter() with an invalid input."));
        expect(function(){game.guessLetter(['a','b','c'])}).toThrow(new Error("Oops. You called Game.guessLetter() with an invalid input."));
        expect(function(){game.guessLetter({foo:"bar"})}).toThrow(new Error("Oops. You called Game.guessLetter() with an invalid input."));
        expect(function(){game.guessLetter(22)}).toThrow(new Error("Oops. You called Game.guessLetter() with an invalid input."));
        expect(function(){game.guessLetter('A')}).toThrow(new Error("Oops. You called Game.guessLetter() with an invalid input."));
        expect(function(){game.guessLetter(true)}).toThrow(new Error("Oops. You called Game.guessLetter() with an invalid input."));
        expect(function(){game.guessLetter()}).toThrow(new Error("Oops. You called Game.guessLetter() with an invalid input."));
    });

    it('guessing correct guess returns true', function(){
        var game = new Game('panda');
        expect(game.guessLetter('p')).toBe(true);
        expect(game.guessLetter('a')).toBe(true);
        expect(game.guessLetter('d')).toBe(true);
        expect(game.guessLetter('n')).toBe(true);
    });

    it('guessing incorrect letter returns false', function(){
        var game = new Game('salamander');
        expect(game.guessLetter('p')).toBe(false);
        expect(game.guessLetter('f')).toBe(false);
        expect(game.guessLetter('z')).toBe(false);
        expect(game.guessLetter('c')).toBe(false);
    });

    it('game is won when all letters are guessed', function(){
        var game = new Game('animal');
        game.guessLetter('l');
        expect(game.isWon()).toBe(false);
        game.guessLetter('m');
        expect(game.isWon()).toBe(false);
        game.guessLetter('n');
        expect(game.isWon()).toBe(false);
        game.guessLetter('a');
        expect(game.isWon()).toBe(false);
        game.guessLetter('i');
        expect(game.isWon()).toBe(true);
    });

    it('game is lost when max incorrect guesses is reached', function(){
        var game = new Game('bah');
        game.guessLetter('z');
        expect(game.isLost()).toBe(false);
        game.guessLetter('y');
        expect(game.isLost()).toBe(false);
        game.guessLetter('x');
        expect(game.isLost()).toBe(false);
        game.guessLetter('w');
        expect(game.isLost()).toBe(false);
        game.guessLetter('v');
        expect(game.isLost()).toBe(false);
        game.guessLetter('u');
        expect(game.isLost()).toBe(true);
        game.guessLetter('t');
        expect(game.isLost()).toBe(true);
    });

    it('keeps track of incorrect guesses', function(){
        var game = new Game('');
        expect(game.getNumberOfGuessesRemaining()).toEqual(6);
        game.guessLetter('a');
        expect(game.getNumberOfGuessesRemaining()).toEqual(5);
        game.guessLetter('b');
        expect(game.getNumberOfGuessesRemaining()).toEqual(4);
        game.guessLetter('c');
        expect(game.getNumberOfGuessesRemaining()).toEqual(3);
        game.guessLetter('d');
        expect(game.getNumberOfGuessesRemaining()).toEqual(2);
        game.guessLetter('e');
        expect(game.getNumberOfGuessesRemaining()).toEqual(1);
        game.guessLetter('f');
        expect(game.getNumberOfGuessesRemaining()).toEqual(0);
    });

    it('keeps track of guessed letters', function () {
        var game = new Game('banana');
        game.guessLetter('s');
        game.guessLetter('b');
        game.guessLetter('f');
        game.guessLetter('n');
        game.guessLetter('z');
        game.guessLetter('t');
        expect(game.getGuessedLetters()).toContain('t');
        expect(game.getGuessedLetters()).toContain('z');
        expect(game.getGuessedLetters()).toContain('n');
        expect(game.getGuessedLetters()).toContain('f');
        expect(game.getGuessedLetters()).toContain('b');
        expect(game.getGuessedLetters()).toContain('s');

        expect(game.getGuessedLetters()).not.toContain('a');
        expect(game.getGuessedLetters()).not.toContain('c');
        expect(game.getGuessedLetters()).not.toContain('d');
        expect(game.getGuessedLetters()).not.toContain('e');
        expect(game.getGuessedLetters()).not.toContain('g');
        expect(game.getGuessedLetters()).not.toContain('h');
        expect(game.getGuessedLetters()).not.toContain('i');
        expect(game.getGuessedLetters()).not.toContain('j');
        expect(game.getGuessedLetters()).not.toContain('k');
        expect(game.getGuessedLetters()).not.toContain('l');
        expect(game.getGuessedLetters()).not.toContain('m');
        expect(game.getGuessedLetters()).not.toContain('o');
        expect(game.getGuessedLetters()).not.toContain('p');
        expect(game.getGuessedLetters()).not.toContain('q');
        expect(game.getGuessedLetters()).not.toContain('r');
        expect(game.getGuessedLetters()).not.toContain('u');
        expect(game.getGuessedLetters()).not.toContain('v');
        expect(game.getGuessedLetters()).not.toContain('w');
        expect(game.getGuessedLetters()).not.toContain('y');
        expect(game.getGuessedLetters()).not.toContain('x');
    });

    it('returns string representation of the word', function(){
        expect(new Game("batch").getWordAsString()).toEqual("batch");
        expect(new Game("pinochet").getWordAsString()).toEqual("pinochet");
    });
});