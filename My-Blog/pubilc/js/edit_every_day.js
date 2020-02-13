$(function(){
    $('#edit').editable({inlineMode: false, alwaysBlank: true})
});

function submit() {
    var from = $('#from').val();
    var content = $('#edit .froala-element').html(); // 富文本结构
    var contentText = $('#edit .froala-element').text(); // 富文本文字内容

    var dataObj = JSON.stringify({from,content});

    if(!contentText) return alert('Type Something Not Null');
    if(!from) return alert('Quotes From Not Null');

    $.ajax({
        type: 'post',
        url: '/insertEveryDay',
        data: dataObj,
        success(res) {
            alert('提交成功');
            // 清空文本内容
            $('#from').val('');
            $('#edit .froala-element').html('');
            setTimeout(() => {
                window.location.href = '/'
              }, 500)
        },
        error(error) {
        throw new Error(error);
        }
    })
}