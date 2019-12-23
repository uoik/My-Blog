var renderSitemap = new Vue({
    el: '#sitemapList',
    data: {
        mapList: []
    },
    computed: {
        queryNewBlog: () => {
            return () => {
                axios.get('/queryNewBlog')
                    .then((result) => {
                        var data = result.data.data.map(i => i = {...i, link: '/blog_detail.html?blog_id=' + i.id});
                        renderSitemap.mapList = data
                    })
                    .catch((error) => {
                        throw new Error(error);
                    })
            }
        }
    },
    created() {
        this.queryNewBlog()// 请求文章数据
    }
})