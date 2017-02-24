const expect = require('expect');
var {Users} = require('./users');



describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: "Bruno",
            room: "Bolso"
        },
        {
            id: '2',
            name: "Juan",
            room: "River"
        },
        {
            id: '3',
            name: "Pedro",
            room: "Bolso"
        }];
    });

    it ('should add new User', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Bruno',
            room: 'Bolso'
        }

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it ('should return name for Bolso', () => {
        var userList = users.getUserList('Bolso');

        expect(userList).toEqual(['Bruno', 'Pedro']);
    });

    it ('should return name for River', () => {
        var userList = users.getUserList('River');

        expect(userList).toEqual(['Juan']);
    });

    it ('should remove user', () => {
        var user = users.removeUser('3');
        expect(user).toEqual({
            id: '3',
            name: 'Pedro',
            room: 'Bolso'
        });
        expect(users.users.length).toBe(2);
    });

    it ('should not remove user', () => {
        var user = users.removeUser('5');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    })

    it ('should find user', () => {
        var user = users.getUser('1');
        expect(user).toEqual({
            id: '1',
            name: 'Bruno',
            room: 'Bolso'
        });
        expect(users.users.length).toBe(3);
    });

    it ('should not find user', () => {
        var user = users.getUser('4');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
})
