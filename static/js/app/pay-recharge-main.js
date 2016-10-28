/**
 * 金钥充值主文件
 */
define(function (require) {
  var $ = require('jquery');
  var tpldata = require('data/template');
  var tplRecharteMain = require('tpl/pay/recharge-main');
  var replaceImgPath = require('components/replace-img-path');
  $(function () {
    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中（#main）
    document.getElementById('main').innerHTML = tplRecharteMain();
    // document.getElementById('main').innerHTML = template('pay/recharge-main',tpldata);
    replaceImgPath();
  });
});
