var mysql = require('mysql')

module.exports.createConnection = () => {
    var connection = mysql.createConnection({
        port: "3306",
        host: 'localhost',
        user: 'root',
        password: 'hui123',
        database: 'my-blog'
    });
    return connection;
}