define(function (require) {
  var $ = require('jquery'),
      mSignModal = require('./components/sign-modal');
  $(function() {

    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中
    // document.getElementById('sign-modal').innerHTML = tplSign();
    var jqBtn = $('#sign-up,#sign-in');
    mSignModal(jqBtn);
  });
});
