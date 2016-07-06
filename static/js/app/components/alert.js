define(function(require) {
  // 操作结果提示
  return {
    success : function(message) {
      $('#alert-success-txt').text(message);
      $('#alert-success').slideDown('fast').delay(3000).slideUp('fast');
    },
    error : function(message) {
      $('#alert-danger-txt').text(message);
      $('#alert-danger').slideDown('fast').delay(3000).slideUp('fast');
    }
  };
});
