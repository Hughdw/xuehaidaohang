/**
 * @title 搜索页面主文件
 * @fileOverView 本文件是搜索页面的入口文件，用于引入并使用相关功能模块。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var mUtil = require('components/util');
  var mApi = require('components/api');
  var tplSearchDemo = require('tpl/course/search-demo');
  $(function () {
   // ************************************
   // 声明
   // ************************************
    var nSearchPage = 1;// 搜索结果的页码（默认1）
    var sKeyWord;// 解码URL传入关键词
    if (mUtil.getQueryString('q')) {
      sKeyWord = decodeURI(mUtil.getQueryString('q'));
    }

   // ************************************
   // 通用
   // ************************************
    // 点击按钮 加载更多
    function loadMoreCont () {
      $('#loadBtn').on('click', function (event) {
        event.preventDefault();
        // 按钮更改加载状态
        var jqBtn = $(this).button('loading');

        // 获取搜索结果
        mApi.getSearch(sKeyWord, nSearchPage)
        .done(function (success) {
          $('#search-content').append(tplSearchDemo({'keyWord': sKeyWord}));
          nSearchPage = ++nSearchPage;
          // 恢复按钮初始状态
          jqBtn.button('reset');
        });
      });
    }

   // ************************************
   // 功能
   // ************************************
    if (sKeyWord) {
      // 默认加载搜索结果
      $('#search-input').val(sKeyWord);
      mApi.getSearch(sKeyWord, nSearchPage)
      .done(function (success) {
        // 后台没有真实数据，临时模拟
        document.getElementById('search-content').innerHTML = tplSearchDemo({'keyWord': sKeyWord});
        nSearchPage = ++nSearchPage;
      });

      loadMoreCont();
    } else {
      $('#loadBtn').on('click', function (event) {
        event.preventDefault();
        alert('请输入要搜索的关键词');
      });
    }
  });
});
