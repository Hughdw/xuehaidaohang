/**
 * @title 原充值记录页面主文件
 * @fileOverView 由于并入personal-center-main.js，因此此文件遗弃。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery'),
      tpldata = require('data/template'),
      tplRechargeMain = require('tpl/personal/recharge-main'),
      tplRechargeCont = require('tpl/personal/recharge-content');
  $(function() {
    tpldata.sidebar.activeMenu = 2;//设置激活导航
    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中（#main）
    document.getElementById('main').innerHTML = tplRechargeMain(tpldata);
    // document.getElementById('main').innerHTML = template('personal/recharge-main',tpldata);
    // 开启工具提示
    $("[data-toggle='tooltip']").tooltip();
    // 点击按钮添加新获取到的内容
    $('.load-box').on('click', '#loadBtn', function(event) {
      event.preventDefault();
      var html = tplRechargeCont(tpldata.recharge);
      $('#recharge-content').append(html);
      // 开启工具提示
      $("[data-toggle='tooltip']").tooltip();
    });
  });
});
