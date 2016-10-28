/**
 * 提示模块
 * 需要页面包含相关HTML结构
<div class="alert-wrap alert-dismissible" id="alert-success">
  <div class="alert alert-success">
    <!-- <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button> -->
    <strong>提示：</strong><i id="alert-success-txt"></i>
  </div>
</div>
<div class="alert-wrap alert-dismissible" id="alert-danger">
  <div class="alert alert-danger" >
    <!-- <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button> -->
    <strong>警告：</strong><i id="alert-danger-txt"></i>
  </div>
</div>
 */
define(function (require) {
  var $ = require('jquery');
  // 操作结果提示
  return {
    success: function (message) {
      $('#alert-success-txt').text(message);
      $('#alert-success').slideDown('fast').delay(3000).slideUp('fast');
    },
    error: function (message) {
      $('#alert-danger-txt').text(message);
      $('#alert-danger').slideDown('fast').delay(3000).slideUp('fast');
    }
  };
});
