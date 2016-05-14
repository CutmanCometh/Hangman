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
    });
});