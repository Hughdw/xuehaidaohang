// 搜索页面的功能
define(function (require) {
  var $ = require('jquery'),
      mUtil = require('components/util'),
      mApi = require('components/api');
  $(function() {
    var nDefaultPage = 1;
    // 2.查询页面对通过URL传入的查询关键词进行解码
    var sKeyWord = decodeURI(mUtil.getQueryString('q'));
    if (sKeyWord !== null) {
      $('#search-input').val(sKeyWord);
      mApi.getSearch(sKeyWord,nDefaultPage)
      .done(function(success) {
        console.log(success);
      });
    }
    $('#loadBtn').on('click', function(event) {
      // event.preventDefault();
      /* Act on the event */
      var $Btn = $(this).button('loading');
      // $Btn.button('reset');//恢复按钮初始状态
    });
  });
});
