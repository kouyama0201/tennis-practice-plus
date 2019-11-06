$(function () {
  function buildHTML(comment) {
    var html = `<div class="comments__body">
                  <p>
                    <strong>
                      <a href=/users/${comment.user_id}>${comment.user_name}<a>：</a></a>
                    </strong>
                    ${comment.text}
                    <a href=""<i class="fa fa-times-circle"></i></a>
                  </p>
                </div>`
    return html;
  }
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.comments').append(html);
        $('.comments').animate({scrollTop: $('.comments')[0].scrollHeight},'fast');
        $('#new_comment')[0].reset();
        $('.send').prop('disabled', false);
      })
      .fail(function(){
        alert('エラーが発生しました');
      })
  })
});