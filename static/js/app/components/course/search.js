/**
 * 顶部搜索框的功能
 */
define(function (require) {
  var $ = require('jquery');
  var mUtil = require('components/util');

  function fnSkipPage () {
    var sKeyword = $('#search-input').val();
    if (sKeyword !== '') {
      window.open(mUtil.getSkipUrl('/course-search.html?q=' + sKeyword), '_self');
    }
  }
  var oSearch = {
    bind: function () {
      // 绑定按钮提交事件
      $('#search-btn').on('click', function (event) {
        event.preventDefault();

        fnSkipPage();
      });
      // 绑定回车提交事件
      $('#search-input').keyup(function (event) {
        if (event.keyCode === 13) {
          fnSkipPage();
        }
      });
    }
  };
  return oSearch;
});
