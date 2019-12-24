var mysql = require('mysql')

module.exports.createConnection = () => {
    var connection = mysql.createConnection({
        port: 3306,
        path: '192.168.56.1',
        user: 'root',
        password: 'hui123',
        database: 'My-Blog'
    });
    return connection;
}