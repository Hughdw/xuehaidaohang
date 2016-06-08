define(function (require) {
  var $ = require('jquery'),
      tplSign = require('tpl/public/sign-modal'),
      mSign = require('./components/sign');
  $(function() {
    var $SignModal = $('#sign-modal');
    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中
    document.getElementById('sign-modal').innerHTML = tplSign();

    // 注册方式切换 手机/邮箱
    $SignModal.on('click', '.tab-list a', function(event) {
      event.preventDefault();
      /* Act on the event */
      $(this).tab('show');
    });

    // 登录注册对话框相关事件绑定
    $SignModal.on('click', '.signin-btn', function(event) {
      event.preventDefault();
      /* Act on the event */
      var $Button = $(event.currentTarget);
      mSign.switchShowModal($Button,$SignModal);
    });
    $SignModal.on('click', '#signup-btn', function(event) {
      event.preventDefault();
      /* Act on the event */
      var $Button = $(event.currentTarget);
      mSign.switchShowModal($Button,$SignModal);
    });
    $SignModal.on('show.bs.modal',function(event) {
      var $Button = $(event.relatedTarget);
      mSign.switchShowModal($Button,$SignModal);
    });
  });
});
