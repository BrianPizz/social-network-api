const { connect, connection } = require('mongoose');
// create and connect to db
connect('mongodb://127.0.0.1:27017/socialNetworkDB');

module.exports = connection;