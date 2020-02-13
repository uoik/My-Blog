var mysql = require('mysql')

module.exports.createConnection = () => {
    var connection = mysql.createConnection({
        port: "3306",
        host: 'localhost',
        user: 'my-blog',
        password: 'EAwrJXWmFmmYbCF5',
        database: 'my-blog'
    });
    return connection;
}