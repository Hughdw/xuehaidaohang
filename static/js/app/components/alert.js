/**
 * @title 提示模块
 * @fileOverView 本文件用于显示/隐藏提示，需要注意的是页面必须包含相关HTML结构，通过模板形式添加到页面中。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');

 // ************************************
 // 对外暴露方法
 // ************************************
  return {
    // 操作成功提示
    success: function (message) {
      $('#alert-success-txt').text(message);
      $('#alert-success').finish().slideDown('fast').delay(3000).slideUp('fast');
    },
    // 操作失败提示
    error: function (message) {
      $('#alert-danger-txt').text(message);
      $('#alert-danger').finish().slideDown('fast').delay(3000).slideUp('fast');
    }
  };
});
