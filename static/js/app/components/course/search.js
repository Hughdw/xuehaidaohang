/**
 * 顶部搜索框的功能
 */
define(function (require) {
  var $ = require('jquery');
  var mUtil = require('components/util');

  // 获取输入框输入字符，跳转搜索页面
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
      $('.navbar-form').keydown(function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          fnSkipPage();
        }
      });
      // $('.navbar-form')
    }
  };
  return oSearch;
});
