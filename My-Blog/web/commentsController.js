var url = require('url');

var commentsDao = require('../dao/commentsDao');
var respUtil = require('../util/respUtil');

var path = new Map();

/**
 * 插入评论
 * @param {*} req 
 * @param {*} res 
 */
function insertComments(req, res) {
    req.on('data', (data) => {
        var params = JSON.parse(data.toString());
        commentsDao.insertComments(params, (result) => {
            res.writeHead(200);
            res.write(respUtil('success', '留言成功', null))
            res.end();
        })
    })
}
path.set('/insertComments', insertComments);

/**
 * 查询评论
 * @param {*} req 
 * @param {*} res 
 */
function queryComments(req, res) {
    var param = url.parse(req.url, true).query;
    commentsDao.queryComments(param.blog_id,param.page, param.pageSize, (result) => {
        commentsDao.queryCommentsTotal(param.blog_id, (result_1) => {
            var data = {
                data: result,
                total: result_1[0].total
            }
            res.writeHead(200);
            res.write(respUtil('success', '留言成功', data))
            res.end();
        })
    })
}
path.set('/queryComments', queryComments);

function queryNewComments(req, res) {
    commentsDao.queryNewComments((result) => {
        res.writeHead(200);
        res.write(respUtil('success', '查询成功', result))
        res.end();
    })
}
path.set('/queryNewComments', queryNewComments);

module.exports.path = path;