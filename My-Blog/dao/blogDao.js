var dbutil = require('./dbutil');
var timeUtil = require('../util/timeUtil');

/**
 * 添加文章数据
 * @param {*} paramObj 参数对象
 * @param {*} success 成功回调
 */
function insertBlog(paramObj = {}, success) {
    var connect = dbutil.createConnection();
    var insertSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) value (?, ?, ?, ?, ?, ?);"
    var {title, content, tags} = paramObj;
    var params = [title, content, tags, 0, timeUtil(), timeUtil()];
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
 * 按页查询文章数据
 */
function queryBlog(page = 1, pageSize = 5, success) {
    var connect = dbutil.createConnection();
    var insertSql = "select * from blog limit ?, ?;"
    var params = [(page - 1) * pageSize, +pageSize];
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

// 请求文章数据总数
function queryBlogTotal(success) {
    var connect = dbutil.createConnection();
    var insertSql = "select count(1) as total from blog;"
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
 * 根据tag查询文章
 * @param {*} tag 标签
 * @param {*} page 页数
 * @param {*} pageSize 页容量
 * @param {*} success 
 */
function queryBlogByTag(tag, page = 1, pageSize = 10, success) {
    var connect = dbutil.createConnection();
    var insertSql = "select * from blog where tags like ? limit ?, ?;"
    var params = ['%'+ tag +'%', (page - 1) * pageSize, +pageSize];
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
// 查询对应tag的总数据量
function queryBlogByTagTotal(tag, success) {
    var connect = dbutil.createConnection();
    var insertSql = "select count(1) as total from blog where tags like ?;"
    var param = ['%'+ tag +'%']
    connect.connect();
    connect.query(insertSql, param, (error, result) => {
        if(result){
            success(result);
        }else {
            throw new Error(error);
        }
    })
    connect.end();
}

/**
 * 根据value查询文章
 * @param {*} value 关键字
 * @param {*} page 
 * @param {*} pageSize 
 */
function queryBlogByValue(value, page, pageSize, success) {
    var connect = dbutil.createConnection();
    var insertSql = "select * from blog where tags like ? or title like ? limit ?, ?;"
    var params = ['%'+ value +'%', '%'+ value +'%', (page - 1) * pageSize, +pageSize];
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
// 查询对应value的总数据量
function queryBlogByValueTotal(value, success) {
    var connect = dbutil.createConnection();
    var insertSql = "select count(1) as total from blog where tags like ? or title like ?;"
    var param = ['%'+ value +'%', '%'+ value +'%'];
    connect.connect();
    connect.query(insertSql, param, (error, result) => {
        if(result){
            success(result);
        }else {
            throw new Error(error);
        }
    })
    connect.end();
}

/**
 * 根据ID查询对应文章
 * @param {*} id 文章对应ID
 * @param {*} success 成功回调
 */
function queryBlogById(id, success) {
    var connect = dbutil.createConnection();
    var insertSql = "select * from blog where id = ?;"
    var param = [id];
    connect.connect();
    connect.query(insertSql, param, (error, result) => {
        if(result){
            success(result);
        }else {
            throw new Error(error);
        }
    })
    connect.end();
}

/**
 * 文章浏览量+1
 * @param {*} blogId 文章ID
 * @param {*} success 
 */
function updateViews(blogId, success){
    var connect = dbutil.createConnection();
    var insertSql = "update blog set views = views + 1 where id = ?;"
    var param = [blogId];
    connect.connect();
    connect.query(insertSql, param, (error, result) => {
        if(result){
            success(result);
        }else {
            throw new Error(error);
        }
    })
    connect.end();
}

// 查询热门文章
function queryHotBlog(success){
    var connect = dbutil.createConnection();
    var insertSql = "select * from blog order by views desc limit 0, 8;"
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

// 查询最新文章
function queryNewBlog(success) {
    var connect = dbutil.createConnection();
    var insertSql = "select * from blog order by ctime desc;"
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
    insertBlog,
    queryBlog,
    queryBlogTotal,
    queryBlogById,
    updateViews,
    queryHotBlog,
    queryNewBlog,
    queryBlogByTag,
    queryBlogByTagTotal,
    queryBlogByValue,
    queryBlogByValueTotal
}