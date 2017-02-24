var expect = require('expect');

var {generateMessage} = require('./message');

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
