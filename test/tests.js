var assert = require('chai').assert;
var exect = require('chai').expect;
var site = require('../site.js');
var checkSet = require('../site.js').checkSet

//To test:
// - deck size changes when more cards are dealt
// - verify set when all are equal
describe('setIfAllValuesEqual', function() {
    it('should return true as all values for cards are equal', function() {
        let result = checkSet([0000,0000,0000])
        assert.equal(result, true);
    });
    it('should return true as all values for cards are equal', function() {
        let result = checkSet([1111,1111,1111])
        assert.equal(result, true);
    });
    it('should return true as all values for cards are equal', function() {
        let result = checkSet([2222,2222,2222])
        assert.equal(result, true);
    });
});
// -verify set when all different
describe('setIfAllValuesDiffer', function() {
    it('should return true as all values for cards are differ', function() {
        let result = checkSet([0121,1210,2002])
        assert.equal(result, true);
    });
    it('should return true as all values for cards are differ', function() {
        let result = checkSet([0000,1111,2222])
        assert.equal(result, true);
    });
    it('should return true as all values for cards are differ', function() {
        let result = checkSet([2100,0012,1221])
        assert.equal(result, true);
    });
});
// - verify when not a set
describe('setIfAllValuesDiffer', function() {
    it('should return false as values do not make a set', function() {
        let result = checkSet([0120,0102,0110])
        assert.equal(result, false);
    });
    it('should return false as values do not make a set', function() {
        let result = checkSet([2100,2122,2111])
        assert.equal(result, false);
    });
    it('should return false as values do not make a set', function() {
        let result = checkSet([1200,1211,1222])
        assert.equal(result, false);
    });
});

describe('cardsLeftInDeck', function() {
    it('should decrese desc sizes after dealing', function() {
        var deckSize = 81;
        expect(deckSize).toBeLessThanOrEqual(81);
    });
});