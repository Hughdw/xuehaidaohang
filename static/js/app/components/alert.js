/**
 * 提示模块
 * 需要页面包含相关HTML结构，通过模板形式添加到页面中。
 */
define(function (require) {
  var $ = require('jquery');
  // 操作结果提示
  return {
    success: function (message) {
      $('#alert-success-txt').text(message);
      $('#alert-success').finish().slideDown('fast').delay(3000).slideUp('fast');
    },
    error: function (message) {
      $('#alert-danger-txt').text(message);
      $('#alert-danger').finish().slideDown('fast').delay(3000).slideUp('fast');
    }
  };
});
