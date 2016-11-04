/**
 * 搜索页面主文件
 */
define(function (require) {
  var $ = require('jquery');
  var mUtil = require('components/util');
  var mApi = require('components/api');
  var tplSearchDemo = require('tpl/course/search-demo');
  $(function () {
    var nDefaultPage = 1;
    // 解码URL传入关键词
    var sKeyWord = decodeURI(mUtil.getQueryString('q'));
    if (sKeyWord !== null) {
      $('#search-input').val(sKeyWord);
      mApi.getSearch(sKeyWord, nDefaultPage)
      .done(function (success) {
        document.getElementById('search-content').innerHTML = tplSearchDemo(sKeyWord);

        console.log(success);
      });
    }
    $('#loadBtn').on('click', function (event) {
      event.preventDefault();
      // $(selector).append(content);
      // var $Btn = $(this).button('loading');
      // $Btn.button('reset');//恢复按钮初始状态
    });
  });
});
