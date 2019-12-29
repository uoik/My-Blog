var mysql = require('mysql')

module.exports.createConnection = () => {
    var connection = mysql.createConnection({
        port: 62687,
        host: 'cd-cdb-b6i1yjbe.sql.tencentcdb.com',
        user: 'root',
        password: 'myblog123',
        database: 'my_blog'
    });
    return connection;
}