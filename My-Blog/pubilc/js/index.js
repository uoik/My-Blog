// 每日一句数据绑定
var everyDay = new Vue({
    el: '#every-day',
    data: {
        everyDay: {
            content: "Find something you're passionate about and keep tremendously interested in it.",
            name: 'Julia Child'
        }
    },
    computed: {
        getContent: function () {
            return this.everyDay.content
        }
    },
    created: function () {
        // 请求数据，查询每日一句数据
        axios.get('/queryEveryDay')
            .then(function (response) {
                everyDay.everyDay.content = response.data.data.content;
                everyDay.everyDay.name = response.data.data.name;
            })
            .catch(function (error) {
                throw new Error(error)
            });
    }
});

// 文章列表数据绑定
var articleList = new Vue({
    el: '#article-list',
    data: {
        page: 1,
        pageSize: 10,
        total: 0,
        articleList: []
    },
    computed: {
        // 查询数据
        queryBlog: () => {
            return (page = 1, pageSize = 10) => {
                var params = location.search.substr(1).split('&');
                var paramObj = {};
                for (const param of params) {
                    if(param == '') continue;
                    paramObj[param.split('=')[0]] = decodeURIComponent(param.split('=')[1]);
                }
                
                if(!paramObj['tag'] && !paramObj['value']){ // 如果tag为false,查询全部文章
                    // 按页请求文章数据
                    axios.get('/queryBlog?page=' + page + '&pageSize=' + pageSize)
                    .then(function (response) {
                        // 处理数据
                        var total = response.data.data[0].total; // 总数据量
                        var articleArr = response.data.data[1]; // 文章列表数据
                        var res = articleArr.map(i => i = {...i, link: '/blog_detail.html?blog_id=' + i.id});
                        // 重新赋值
                        articleList.articleList = res;
                        articleList.total = total;
                    })
                    .catch(function (error) {
                        throw new Error(error)
                    });
                } else if(paramObj['tag']) { // 如果tag为true, 查询对应tag文章
                    axios.get('/queryBlogByTag?tag=' + paramObj['tag'] + '&page=' + page + '&pageSize=' + pageSize)
                        .then((result) => {
                            // 处理数据
                            var total = result.data.data[0].total; // 总数据量
                            var articleArr = result.data.data[1]; // 文章列表数据
                            var res = articleArr.map(i => i = {...i, link: '/blog_detail.html?blog_id=' + i.id});
                            // 重新赋值
                            articleList.articleList = res;
                            articleList.total = total;
                        })
                        .catch((error) => {
                            throw new Error(error);
                        })
                } else if(paramObj['value']) {
                    axios.get('/queryBlogByValue?value=' + paramObj['value'] + '&page=' + page + '&pageSize=' + pageSize)
                        .then((result) => {
                            // 处理数据
                            var total = result.data.data[0].total; // 总数据量
                            var articleArr = result.data.data[1]; // 文章列表数据
                            var res = articleArr.map(i => i = {...i, link: '/blog_detail.html?blog_id=' + i.id});
                            // 重新赋值
                            articleList.articleList = res;
                            articleList.total = total;
                        })
                        .catch((error) => {
                            throw new Error(error);
                        })
                }
                
            }
        },
        // 修改时间格式
        updateTime: () => {
            return (time) => {
                return new Date(time * 1000).toLocaleDateString().replace(/\//g, '-');
            }
        },
        // 点击上一页触发
        prevClick: function () {
            return function (num) {
                articleList.page = articleList.page - 1;
                articleList.queryBlog(articleList.page, articleList.pageSize);
            }
        },
        // 点击下一页触发
        nextClick: function () {
            return function (num) {
                articleList.page = articleList.page + 1;
                articleList.queryBlog(articleList.page, articleList.pageSize);
            }
        },
        // 点击页数触发
        currentChange: function () {
            return function (num) {
                articleList.page = num;
                articleList.queryBlog(articleList.page, articleList.pageSize);
            }
        }
    },
    created: function () {
        this.queryBlog(this.page, this.pageSize); // 请求数据，给articleList赋值
    }
})

// 渲染element组件
new Vue({
    el: '#element-ui'
})