/**
 * @title 金钥充值页面主文件
 * @fileOverView 本文件是金钥充值页面的入口文件，用于引入并使用相关功能模块。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var tpldata = require('data/template');
  var tplRecharteMain = require('tpl/pay/recharge-main');
  $(function () {
    document.getElementById('main').innerHTML = tplRecharteMain();
  });
});
