var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it ('shoul generate de correct message object', () => {
        var from = "User 1";
        var text = "A Message";

        var message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });
})

describe('generateLocationMessage', () => {
    it ('shoul generate de correct location message object', () => {
        var from = "User 1";
        var latitude = "45.00094";
        var longitude = "12.00094";

        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps?q=45.00094,12.00094`);
        expect(message.createdAt).toBeA('number');
    });
})
