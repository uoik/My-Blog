// 关键字查找
var searchBar = new Vue({
    el: '#search_bar',
    computed: {
        queryKeyBlog: () => {
            return () => {
                var value = document.getElementById('search_box').value;
                location.href = '/?value=' + value;
            }
        }
    }
})

// 随机标签渲染
var renderTags = new Vue({
    el: '#tags',
    data: {
        tagsArr: []
    },
    computed: {
        // 生成随机颜色
        renderColor: () => {
            return () => '#' + parseInt(Math.random() * 16777216, 10).toString(16);
        },
        // 生成随机大小
        renderSize: () => {
            return  () => Math.ceil((Math.random() * 12 + 10)) + 'px';
        },
        // 请求标签数据
        queryAllTags: () => {
            return () => {
                axios.get('/queryAllTags')
                .then((result) => {
                    var data = result.data.data.map(i => {
                        return i = {
                            ...i,
                            link: '/?tag=' + i.tag
                        }
                    })
                    renderTags.tagsArr = data;
                })
                .catch((error) => {
                    throw new Error(error);
                })
            }
        }
    },
    created(){
        this.queryAllTags(); // 请求标签数据
    }
})

// 最近热门渲染
var renderHotMenu = new Vue({
    el: '#hot-menu',
    data: {
        menuList: []
    },
    computed: {
        // 查询最近热门文章
        queryHotBlog: () => {
            return () => {
                axios.get('/queryHotBlog')
                    .then((result) => {
                        var data = result.data.data.map(i => i = {...i, link: '/blog_detail.html?blog_id=' + i.id});
                        renderHotMenu.menuList = data;
                    })
                    .catch((error) => {
                        throw new Error(error);
                    })
            }
        }
    },
    created(){
        this.queryHotBlog(); // 请求最近热门数据
    }
})

// 最新评论
var renderComments = new Vue({
    el: '#new-comments',
    data: {
        commentsList: []
    },
    computed: {
        // 请求最新评论
        queryNewComments: () => {
            return () => {
                axios.get('/queryNewComments')
                    .then((result) => {
                        var data = result.data.data.map(i => i = {...i, link: '/blog_detail.html?blog_id=' + i.blog_id});
                        renderComments.commentsList = data;
                    })
                    .catch((error) => {
                        throw new Error(error);
                    })
            }
        },
        // 修改时间格式
        updateTime: () => {
            return (time) => {
                var date = new Date(time * 1000);
                var F = date.getFullYear();
                var Month = date.getMonth() + 1;
                var D = date.getDate();
                var H = date.getHours();
                var Minutes = date.getMinutes();
                Month = Month >= 10 ? Month : '0' + Month;
                D = D >= 10 ? D : '0' + D;
                H = H >= 10 ? H : '0' + H;
                Minutes = Minutes >= 10 ? Minutes : '0' + Minutes;
                return F + '年' + Month + '月' + D + '日' + ' ' + H + ":" + Minutes;
            }
        },
    },
    created(){
        this.queryNewComments(); // 请求最新评论
    }
})