var express = require('express');

var globalConfig = require('./config')
var loader = require('./loader');
var app = express();

app.use(express.static('./pubilc/'));

// 插入查询每日一句
app.post('/insertEveryDay', loader.paths.get('/insertEveryDay'));
app.get('/queryEveryDay', loader.paths.get('/queryEveryDay'));

// 插入查询博客文章
app.post('/insertBlog', loader.paths.get('/insertBlog'));
app.get('/queryBlog', loader.paths.get('/queryBlog'));
// 请求文章总数据量
app.get('/queryBlogTotal', loader.paths.get('/queryBlogTotal'));
// 根据ID请求对应文章
app.get('/queryBlogById', loader.paths.get('/queryBlogById'));
// 查询热门文章
app.get('/queryHotBlog', loader.paths.get('/queryHotBlog'));
// 查询最新文章数据
app.get('/queryNewBlog', loader.paths.get('/queryNewBlog'));
// 根据tag查询文章
app.get('/queryBlogByTag', loader.paths.get('/queryBlogByTag'));
// 根据value查询文章
app.get('/queryBlogByValue', loader.paths.get('/queryBlogByValue'));

// 请求验证码数据
app.get('/getSvgCaptcha', loader.paths.get('/getSvgCaptcha'));

// 插入评论内容
app.post('/insertComments', loader.paths.get('/insertComments'));
app.get('/queryComments', loader.paths.get('/queryComments'));
// 查询最新评论
app.get('/queryNewComments', loader.paths.get('/queryNewComments'));

// 查询标签数据
app.get('/queryAllTags', loader.paths.get('/queryAllTags'));
app.listen(globalConfig.port, () => {
    console.log('服务器已启动');
});