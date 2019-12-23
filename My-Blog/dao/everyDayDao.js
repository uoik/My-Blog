var dbutil = require('./dbutil');
var timeUtil = require('../util/timeUtil');

/**
 * 添加每日一句数据
 * @param {*} content 内容
 * @param {*} from 引用自
 * @param {*} success 成功回调
 */
function insertEveryDay(content, from, success) {
    var connect = dbutil.createConnection();
    var insertSql = "insert into every_day (`content`, `name`, `ctime`) value (?, ?, ?);"
    var params = [content, from, timeUtil()]
    connect.connect();
    connect.query(insertSql, params, (error, result) => {
        if(result){
            success(result);
        }else {
            throw new Error(error);
        }
    })
    connect.end();
}

function queryEveryDay(success) {
    var connect = dbutil.createConnection();
    var querySql = "select * from every_day order by id desc limit 1;"
    connect.connect();
    connect.query(querySql, (error, result) => {
        if(result){
            success(result);
        }else {
            throw new Error(error);
        }
    })
    connect.end();
}

module.exports = {
    insertEveryDay,
    queryEveryDay
}