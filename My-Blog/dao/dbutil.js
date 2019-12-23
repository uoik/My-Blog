var mysql = require('mysql')

module.exports.createConnection = () => {
    var connection = mysql.createConnection({
        port: 3306,
        path: '127.0.0.1',
        user: 'root',
        password: 'hui123',
        database: 'My-Blog'
    });
    return connection;
}