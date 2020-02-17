// 初始化富文本
var editor = new Simditor({
    textarea: $('#editor'),
    placeholder: '每日一句',
    toolbar: [
        'title',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'fontScale',
        'color'
    ]
});

// 提交上传数据
function submit() {
    var name = $('#title').val(); // 获取标题
    var content = editor.getValue(); // 获取正文内容

    // 判断文章是否填写完整
    if (!name || !content) {
        alert('内容填写不完整,请检查!');
    }

    var data = JSON.stringify({
        name,
        content
    }); // 转换JSON格式

    // 发送网络请求
    $.ajax({
        type: 'post',
        url: '/insertEveryDay',
        data,
        success(result) {
            // 提交成功后跳转到首页
            location.href = '/';
        },
        error(error) {
            throw new Error(error);
        }
    })
}