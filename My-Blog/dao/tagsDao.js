var dbutil = require('./dbutil');
var timeUtil = require('../util/timeUtil');

/**
 * 查询单个标签
 * @param {*} tag 标签
 * @param {*} blogId 
 */
function queryTag(tag, success) {
    var connect = dbutil.createConnection();
    var insertSql = "select * from tags where tag = ?;"
    var params = [tag];
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

/**
 * 查询全部tags
 * @param {*} success 
 */
function queryAllTags(success) {
    var connect = dbutil.createConnection();
    var insertSql = "select * from tags;"
    connect.connect();
    connect.query(insertSql, (error, result) => {
        if(result){
            success(result);
        }else {
            throw new Error(error);
        }
    })
    connect.end();
}

/**
 * 添加标签数据
 * @param {*} tag 标签名
 * @param {*} success 成功回调
 */
function setTags(tag, success) {
    var connect = dbutil.createConnection();
    var insertSql = "insert into tags (`tag`, `ctime`, `utime`) value (?, ?, ?);"
    var params = [tag, timeUtil(), timeUtil()];
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

module.exports = {
    queryTag,
    setTags,
    queryAllTags
}