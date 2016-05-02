define(function (require) {
  var mCom = require('mod/common');
  var $ = require('jquery');
  $(function() {
    $('#loadBtn').on('click', function(event) {
      // event.preventDefault();
      /* Act on the event */
      var $Btn = $(this).button('loading');
      // business logic...
      // $Btn.button('reset');//恢复按钮初始状态
    });
  });
});
