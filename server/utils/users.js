var lowerCase = require('lower-case');

class Users {
    constructor () {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {
            id,
            name: name.trim(),
            room: lowerCase(room)
        }

        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    // Devuelve nombres de usuarios en el room
    getUserList(room) {
        var users = this.users.filter((user) => user.room === lowerCase(room));

        var namesArray = users.map((user) => user.name);

        return namesArray;
    }

    existsNameInRoom(name, room) {
        var usersWithThatName = this.users.filter((user) => user.name === name.trim() && user.room === lowerCase(room));
        if (usersWithThatName[0]) {
            return true;
        }
        return false;
    }
}

module.exports = {
    Users
}
