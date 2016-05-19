define(function (require) {
  var $ = require('jquery'),
      tpldata = require('tpldata'),
      render = require('tpl/pay/recharge-main'),
      replaceImgPath = require('mod/replace-img-path');
  $(function() {

    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中（#main）
    document.getElementById('main').innerHTML = render();
    // document.getElementById('main').innerHTML = template('pay/recharge-main',tpldata);
    replaceImgPath();

  });
});
