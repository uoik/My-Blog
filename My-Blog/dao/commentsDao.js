var dbutil = require('./dbutil');
var timeUtil = require('../util/timeUtil');

/**
 * 插入评论数据
 * @param {*} tag 标签
 * @param {*} blogId 
 */
function insertComments(paramObj, success) {
    var connect = dbutil.createConnection();
    var insertSql = "insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `comments`, `email`, `ctime`, `utime`) value (?,?,?,?,?,?,?,?);"
    var {blogId, parent, parentName, name, comments, email} = paramObj;
    var params = [+blogId, +parent, parentName, name, comments, email, timeUtil(), timeUtil()];
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
 * 查询对应文章评论数据
 * @param {*} blogId 
 * @param {*} success 
 */
function queryComments(blogId, page, pageSize, success){
    var connect = dbutil.createConnection();
    var insertSql = "select * from comments where blog_id = ? limit ?, ?;"
    var params = [+blogId, (page - 1) * pageSize, +pageSize];
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
 * 查询对应文章评论量
 * @param {*} blogId 
 * @param {*} success 
 */
function queryCommentsTotal(blogId, success) {
    var connect = dbutil.createConnection();
    var insertSql = "select count(1) as total from comments where blog_id = ?;"
    var params = [+blogId];
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
 * 查询最新评论
 * @param {*} success 
 */
function queryNewComments(success){
    var connect = dbutil.createConnection();
    var insertSql = "select * from comments order by ctime desc limit 0, 8;"
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

module.exports = {
    insertComments,
    queryComments,
    queryCommentsTotal,
    queryNewComments
}