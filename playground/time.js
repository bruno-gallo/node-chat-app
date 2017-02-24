// UNIX EPIC: 1/1/1970 00:00:00
// Timestamp = cantidad de milisegundos desde UNIX EPIC
// Pueden ser positivos o negativos

var moment = require('moment');

var createdAt = 1475871682311;

var date = moment(createdAt);

console.log(date.format('Do MMM YYYY'));

console.log(date.format('h:mm A'));
