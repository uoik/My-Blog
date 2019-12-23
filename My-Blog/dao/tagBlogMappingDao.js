var dbutil = require('./dbutil');
var timeUtil = require('../util/timeUtil');

/**
 * 设置标签文章映射
 * @param {*} tagId 标签ID
 * @param {*} blogId 文章ID
 */
function setTagIdBlogId(tagId, blogId) {
    var connect = dbutil.createConnection();
    var insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) value (?, ?, ?, ?);"
    var params = [tagId, blogId, timeUtil(), timeUtil()];
    connect.connect();
    connect.query(insertSql, params, (error, result) => {
        if(error != null){
            throw new Error(error);
        }
    })
    connect.end();
}

module.exports = {
    setTagIdBlogId
}