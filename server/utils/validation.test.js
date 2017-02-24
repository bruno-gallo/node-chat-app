const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {

    it ('should determine that valid string IS valid', () => {
        var validString = "Bruno";

        var result = isRealString(validString);

        expect(result).toBe(true);
    })

    it ('should determine that empty string IS NOT valid', () => {
        var invalidString = "     ";

        var result = isRealString(invalidString);

        expect(result).toBe(false);
    })

    it ('should determine that number is not valid', () => {
        var number = 12;

        var result = isRealString(number);

        expect(result).toBe(false);
    })
})
