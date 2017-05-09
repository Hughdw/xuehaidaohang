/**
 * @title 原优惠信息页面主文件
 * @fileOverView 由于并入personal-center-main.js，因此此文件遗弃。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery'),
      tpldata = require('data/template'),
      tplPreferentialMain = require('tpl/personal/preferential-main');
  $(function() {
    tpldata.sidebar.activeMenu = 4;//设置激活导航
    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中（#main）
    document.getElementById('main').innerHTML = tplPreferentialMain(tpldata);
    // document.getElementById('main').innerHTML = template('personal/preferential-main',tpldata);

  });
});
