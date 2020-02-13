$(function(){
    $('#edit').editable({language: 'zh_cn', inlineMode: false, alwaysBlank: true})
});

function submit() {
  var title = $('#title').val();
  var tags = $('#tags').val();
  var content = $('#edit .froala-element').html(); // 富文本结构
  var contentText = $('#edit .froala-element').text(); // 富文本文字内容

  if(!title) return alert('文章标题不可为空');
  if(!tags) return alert('文章标签不可为空');
  if(!contentText) return alert('文章内容不可为空');

  var dataObj = JSON.stringify({title, tags, content});

  $.ajax({
      type: 'post',
      url: '/insertBlog',
      data: dataObj,
      success(result) {
        alert('提交成功');
        $('#title').val('');
        $('#tags').val('');
        $('#edit .froala-element').text('');
        setTimeout(() => {
          window.location.href = '/'
        }, 500)
      },
      error(error){
          throw new Error(error);
      }
  })
}