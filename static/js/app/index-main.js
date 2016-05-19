define(function (require) {
  var $ = require('jquery');
      tplSign = require('tpl/public/sign-modal'),
      tplRetrieve = require('tpl/public/password-retrieve-modal');
  $(function() {
    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中（#main）
    document.getElementById('sign-modal').innerHTML = tplSign();
    document.getElementById('password-retrieve-modal').innerHTML = tplRetrieve();
    $('#sign-modal').on('show.bs.modal',function(event) {
      var button = $(event.relatedTarget);
      var showModal = button.data('whatever');
      var modal = $(this);
      var hideModal = $('.modal-content');
      hideModal.hide();
      modal.find(showModal).show();
    });
  });
});
