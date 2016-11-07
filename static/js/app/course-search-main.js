/**
 * 搜索页面主文件
 */
define(function (require) {
  var $ = require('jquery');
  var mUtil = require('components/util');
  var mApi = require('components/api');
  var tplSearchDemo = require('tpl/course/search-demo');
  $(function () {
    // 搜索结果的页码（默认1）
    var nSearchPage = 1;
    // 解码URL传入关键词
    var sKeyWord = decodeURI(mUtil.getQueryString('q'));
    if (sKeyWord) {
      $('#search-input').val(sKeyWord);
      mApi.getSearch(sKeyWord, nSearchPage)
      .done(function (success) {
        // 后台没有真实数据，临时模拟
        document.getElementById('search-content').innerHTML = tplSearchDemo({'keyWord': sKeyWord});
        nSearchPage = ++nSearchPage;
      });
    }
    $('#loadBtn').on('click', function (event) {
      event.preventDefault();

      // 按钮更改加载状态
      var jqBtn = $(this).button('loading');

      mApi.getSearch(sKeyWord, nSearchPage)
      .done(function () {
        $('#search-content').append(tplSearchDemo({'keyWord': sKeyWord}));
        nSearchPage = ++nSearchPage;
        // 恢复按钮初始状态
        jqBtn.button('reset');
      });
    });
  });
});
