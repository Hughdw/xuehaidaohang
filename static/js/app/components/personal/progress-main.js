/**
 * 配合personal-center-main.js加载
 * 学习进度
 */
define(function (require) {
  var $ = require('jquery');
  var mApi = require('components/api');
  var mRegroupData = require('components/personal/regroup-data');
  var mAlert = require('components/alert');
  var tplProgressMain = require('tpl/personal/progress-main');
  var tplProgressContent = require('tpl/personal/progress-content');

  var oProgress = {};
  // 历史记录页码（默认）
  var nHistoryPage = 1;

  // 加载内容
  oProgress.loadContent = function (tokenP) {
    // 渲染表格外框
    document.getElementById('mainbar').innerHTML = tplProgressMain();
    // 获取学习进度信息
    mApi.getHistory(nHistoryPage, tokenP)
    .done(function (success) {
      // 重新组织 学习进度 的数据
      var progressData = mRegroupData.progress(success.data);
      console.log(progressData);
      // 渲染学习进度数据
      document.getElementById('progress-content').innerHTML = tplProgressContent(progressData);
      nHistoryPage = ++nHistoryPage;
      oProgress._bind(tokenP);
    })
    .fail(function (error) {
      // 临时处理方式
      mAlert.error(error);
    });
  };
  // 绑定事件
  oProgress._bind = function (tokenP) {
    $('#loadBtn').on('click', function (event) {
      event.preventDefault();

      // 获取学习进度信息
      console.log(1);
      mApi.getHistory(nHistoryPage, tokenP)
      .done(function (success) {
        // 重新组织 学习进度 的数据
        var progressData = mRegroupData.progress(success.data);
        console.log(progressData);
        // 渲染学习进度数据
        $('#progress-content').append(tplProgressContent(progressData));
        nHistoryPage = ++nHistoryPage;
      })
      .fail(function () {

      });
    });
  };


  return oProgress;
});
