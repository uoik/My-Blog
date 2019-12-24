var mysql = require('mysql')

module.exports.createConnection = () => {
    var connection = mysql.createConnection({
        port: 3306,
        path: '192.172.1.102',
        user: 'root',
        password: 'hui123',
        database: 'My-Blog'
    });
    return connection;
}