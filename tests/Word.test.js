/**
 * Created by CutmanCometh on 5/11/16.
 */

describe('Word class', function () {

    var word1, word2, word3;

    beforeEach(function () {
        word1 = new Word('potato');
        word2 = new Word('mandragora');
        word3 = new Word('bot');
    })

    it('initializes a new word', function () {
        var word = new Word("sable");
        var mask = word.getMask();

        expect(mask).toEqual([false,false,false,false,false]);
    })

    it('guessing letter returns correct number of matches', function () {
        expect(new Word('potato').guessLetter('o')).toEqual(2)
        expect(new Word('fabulous').guessLetter('z')).toEqual(0)
        expect(new Word('bracken').guessLetter('a')).toEqual(1)
        expect(new Word('mississippi').guessLetter('s')).toEqual(4)
    })

    it('guessing correct letter alters mask appropriately', function () {
        word1.guessLetter('t')
        expect(word1.getMask()).toEqual([false,false,'t',false,'t',false])

        word2.guessLetter('r')
        expect(word2.getMask()).toEqual([false,false,false,false,'r',false,false,false,'r',false])

        word2.guessLetter('a')
        expect(word2.getMask()).toEqual([false,'a',false,false,'r','a',false,false,'r','a'])

        word3.guessLetter('g')
        expect(word3.getMask()).toEqual([false,false,false])
    })

    it('mask string is altered by guesses', function () {
        word2.guessLetter('b')//incorrect guess
        expect(word2.getMaskString()).toEqual('__________')

        word2.guessLetter('r')//correct guess
        expect(word2.getMaskString()).toEqual('____r___r_')

        word2.guessLetter('a')//correct guess
        expect(word2.getMaskString()).toEqual('_a__ra__ra')

        word2.guessLetter('p')//incorrect guess
        expect(word2.getMaskString()).toEqual('_a__ra__ra')
    })

    it('returns string representation', function(){
        expect(word1.getWordAsString()).toEqual("potato");
        expect(word2.getWordAsString()).toEqual("mandragora");
        expect(word3.getWordAsString()).toEqual("bot");
    })

    it('guessing invalid letter thorws error', function () {
        expect(function(){word1.guessLetter('')}).toThrow(new Error("Invalid argument to Word.guessLetter()"))
        expect(function(){word1.guessLetter(1)}).toThrow(new Error("Invalid argument to Word.guessLetter()"))
        expect(function(){word1.guessLetter(['bah'])}).toThrow(new Error("Invalid argument to Word.guessLetter()"))
        expect(function(){word1.guessLetter({})}).toThrow(new Error("Invalid argument to Word.guessLetter()"))
        expect(function(){word1.guessLetter(false)}).toThrow(new Error("Invalid argument to Word.guessLetter()"))
        expect(function(){word1.guessLetter('F')}).toThrow(new Error("Invalid argument to Word.guessLetter()"))
    })
})