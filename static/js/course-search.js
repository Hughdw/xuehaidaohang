requirejs(['static/js/config.js'], function(config) {
  requirejs(['jquery', 'bootstrap', 'app/common'], function($, bs, common) {
    $(function() {
      $('#loadBtn').on('click', function(event) {
        // event.preventDefault();
        /* Act on the event */
        var $btn = $(this).button('loading');
        // business logic...
        // $btn.button('reset');//恢复按钮初始状态
      });
    });
  });
});
