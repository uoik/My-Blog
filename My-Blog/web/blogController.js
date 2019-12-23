var path = new Map();
var blogDao = require('../dao/blogDao');
var tagsDao = require('../dao/tagsDao');
var tagBlogMappingDao = require('../dao/tagBlogMappingDao');
var respUtil = require('../util/respUtil');
var url = require('url')

// 将文章数据插入到数据库中
function insertBlog (req, res) {
    req.on('data', (data) => {
        var params = JSON.parse(data.toString());
        var tags = params.tags.replace(/ /g, '').replace(/，/g,',')
        var paramObj = {
            title: params.title,
            content: params.content,
            tags: tags
        }
        
        blogDao.insertBlog(paramObj, (result) => {
            res.writeHead(200);
            res.write(respUtil('success', '添加成功', null));
            res.end();

            var blogId = result.insertId; // 文章对应id
            var tagsArr = tags.split(',');
            for (const tag of tagsArr) {
                if(tag == '') continue; // 标签为空进入下一次循环
                queryTag(tag, blogId);
            }
        })
    })
}
path.set('/insertBlog', insertBlog);

/**
 * 辅助函数
 * 查询标签是否存在，存在则跳过添加标签步骤，直接添加对应映射
 * @param {*} tag 
 * @param {*} blogId 
 */
function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, (result) => {
        if(result == null || result.length == 0){
            insertTag(tag, blogId)
        }else {
            insertTagBlogMapping(result[0].id, blogId);
        }
    })
}

/**
 * 辅助函数
 * 插入标签
 * @param {*} tag 标签
 * @param {*} blogId 文章ID
 */
function insertTag(tag, blogId) {
    tagsDao.setTags(tag, (result) => {
        insertTagBlogMapping(result.insertId, blogId);
    })
}

/**
 * 辅助函数
 * 设置标签文章映射
 * @param {*} tagId 标签ID
 * @param {*} blogId 文章ID
 */
function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.setTagIdBlogId(tagId, blogId);
}

/**
 * 按页查询文章数据
 */
function queryBlog(req, res){
    var params = url.parse(req.url, true).query;
    blogDao.queryBlog(params.page, params.pageSize, (result) => {
        blogDao.queryBlogTotal((resultTotal) => {
            var data = [resultTotal[0], result];
            res.writeHead(200);
            res.write(respUtil('success', '查询成功', data))
            res.end();
        })
    })
}
path.set('/queryBlog', queryBlog);

/**
 * 根据tag查询文章
 * @param {*} req 
 * @param {*} res 
 */
function queryBlogByTag(req, res) {
    var params = url.parse(req.url, true).query;
    blogDao.queryBlogByTag(params.tag, params.page, params.pageSize, (result) => {
        blogDao.queryBlogByTagTotal(params.tag, (resultTotal) => {
            var data = [resultTotal[0], result];
            res.writeHead(200);
            res.write(respUtil('success', '查询成功', data))
            res.end();
        })
    })
}
path.set('/queryBlogByTag', queryBlogByTag);

function queryBlogByValue(req, res) {
    var params = url.parse(req.url, true).query;
    console.log(params)
    blogDao.queryBlogByValue(params.value, params.page, params.pageSize, (result) => {
        blogDao.queryBlogByValueTotal(params.value, (resultTotal) => {
            var data = [resultTotal[0], result];
            res.writeHead(200);
            res.write(respUtil('success', '查询成功', data))
            res.end();
        })
    })
}
path.set('/queryBlogByValue', queryBlogByValue);

/**
 * 请求文章数据总数
 */
function queryBlogTotal(req, res){
    blogDao.queryBlogTotal((result) => {
        res.writeHead(200);
        res.write(respUtil('success', '查询成功', result))
        res.end();
    })
}
path.set('/queryBlogTotal', queryBlogTotal);

/**
 * 根据ID查询对应文章
 */
function queryBlogById(req, res) {
    var param = url.parse(req.url, true).query;
    blogDao.updateViews(param.blog_id, () => {
        blogDao.queryBlogById(param.blog_id, (result) => {
            res.writeHead(200);
            res.write(respUtil('success', '查询成功', result));
            res.end();
        })
    });
    
}
path.set('/queryBlogById', queryBlogById);

function queryHotBlog(req, res) {
    blogDao.queryHotBlog((result) => {
        res.writeHead(200);
        res.write(respUtil('success', '查询成功', result));
        res.end();
    })
}
path.set('/queryHotBlog', queryHotBlog);

/**
 * 查询最新文章
 * @param {*} req 
 * @param {*} res 
 */
function queryNewBlog(req, res) {
    blogDao.queryNewBlog((result) => {
        res.writeHead(200);
        res.write(respUtil('success', '查询成功', result));
        res.end();
    })
}
path.set('/queryNewBlog', queryNewBlog);

module.exports.path = path;