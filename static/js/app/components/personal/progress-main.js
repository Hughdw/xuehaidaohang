define(function(require) {
  var mApi = require('components/api'),
      mData = require('components/personal/data'),
      mAlert = require('components/alert'),
      tplProgressMain = require('tpl/personal/progress-main'),
      tplProgressContent = require('tpl/personal/progress-content');

  var oProgress = {};
  // 历史记录页码（默认）
  var nHistoryPage = 1;

  // 加载内容
  oProgress.loadContent = function(token_p) {
    // 渲染表格外框
    document.getElementById('mainbar').innerHTML = tplProgressMain();
    // 获取学习进度信息
    mApi.getHistory(nHistoryPage,token_p)
    .done(function(success) {
      // 重新组织 学习进度 的数据
      var progressData = mData.regroupProgress(success.data);
      console.log(progressData);
      // 渲染学习进度数据
      document.getElementById('progress-content').innerHTML = tplProgressContent(progressData);
      nHistoryPage = ++ nHistoryPage;
      oProgress._bind(token_p);
      // replaceImgPath();
    })
    .fail(function(error) {
      
    });
  };
  // 绑定事件
  oProgress._bind = function(token_p) {
    $('#loadBtn').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      // 获取学习进度信息
      console.log(1);
      mApi.getHistory(nHistoryPage,token_p)
      .done(function(success) {
        // 重新组织 学习进度 的数据
        var progressData = mData.regroupProgress(success.data);
        console.log(progressData);
        // 渲染学习进度数据
        $('#progress-content').append(tplProgressContent(progressData));
        nHistoryPage = ++ nHistoryPage;
      })
      .fail(function(error) {

      });
    });
  };



  return oProgress;
});
