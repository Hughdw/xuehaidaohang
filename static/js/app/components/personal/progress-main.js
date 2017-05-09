/**
 * @title 学习进度
 * @fileOverView 本文件用于加载学习进度页面的内容，实现了相关按钮的事件绑定和内容渲染。
 * @other 配合personal-center-main.js加载
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var mApi = require('components/api');
  var mRegroupData = require('components/personal/regroup-data');
  var mAlert = require('components/alert');
  var tplProgressMain = require('tpl/personal/progress-main');
  var tplProgressContent = require('tpl/personal/progress-content');

 // ************************************
 // 声明
 // ************************************
  var oProgress = {};
  // 历史记录页码（默认1）
  var nHistoryPage = 1;

 // ************************************
 // 内部方法
 // ************************************
  // 加载更多内容
  oProgress._bind = function (token) {
    $('#loadBtn').on('click', function (event) {
      event.preventDefault();
      // 按钮更改加载状态
      var jqBtn = $(this).button('loading');

      // 获取学习进度信息
      mApi.getHistory(nHistoryPage, token)
      .done(function (success) {
        // 重新组织 学习进度 的数据
        var progressData = mRegroupData.progress(success.data);

        // 渲染学习进度数据
        $('#progress-content').append(tplProgressContent(progressData));
        nHistoryPage = ++nHistoryPage;
        // 恢复按钮初始状态
        jqBtn.button('reset');
      })
      .fail(function () {

      });
    });
  };

 // ************************************
 // 对外暴露方法
 // ************************************
  // 默认加载内容
  oProgress.loadContent = function (token) {
    // 渲染表格外框
    document.getElementById('mainbar').innerHTML = tplProgressMain();
    // 获取学习进度信息
    mApi.getHistory(nHistoryPage, token)
    .done(function (success) {
      // 重新组织 学习进度 的数据
      var progressData = mRegroupData.progress(success.data);

      // 渲染学习进度数据
      document.getElementById('progress-content').innerHTML = tplProgressContent(progressData);
      nHistoryPage = ++nHistoryPage;
      oProgress._bind(token);
    })
    .fail(function (error) {
      // 临时处理方式
      mAlert.error(error);
    });
  };

  return oProgress.loadContent;
});
