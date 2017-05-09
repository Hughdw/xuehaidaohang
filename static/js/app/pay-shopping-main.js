/**
 * @title 购物车主文件
 * @fileOverView 本文件是购物车的入口文件，用于引入并使用相关功能模块。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var tpldata = require('data/template');
  var tplShoppingMain = require('tpl/pay/shopping-main');
  $(function () {
    document.getElementById('main').innerHTML = tplShoppingMain();
  });
});
