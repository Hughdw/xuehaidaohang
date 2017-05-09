/**
 * @title 下拉窗口事件绑定模块
 * @fileOverView 本文件用于绑定页面中的下拉窗口事件以及空白处收缩。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');

 // ************************************
 // 声明
 // ************************************
  // 存放切换对象
  var aStoreToggle = [];
  // 存放切换对象的父元素
  var aStoreToggleParent = [];

 // ************************************
 // 内部方法
 // ************************************
  // 点击空白地方收起下拉菜单
  $(document).on('click', function (event) {
    var jqTarget = $(event.target);
    for (var i = 0; i < aStoreToggleParent.length; i++) {
      // 点击目标不是 激活区域 就还原成下拉框的初始状态
      if (jqTarget.parents(aStoreToggleParent[i]).length === 0) {
        $(aStoreToggle[i]).addClass('btn-link');
        $(aStoreToggle[i]).parents('.btn-group').removeClass('open');
      }
    }
  });

 // ************************************
 // 对外暴露方法
 // ************************************
  // 点击展开下拉菜单
  return function (toggleBtn, parent) {
      // 保存触发元素和触发范围
    aStoreToggle.push(toggleBtn);
    aStoreToggleParent.push(parent);
    $(toggleBtn).on('click', function (event) {
      event.preventDefault();
      $(this).parents('.btn-group').toggleClass('open');
      $(this).toggleClass('btn-link');
        // 停止冒泡，防止触发document的click事件
      event.stopPropagation();
        // 隐藏其他显示的下拉框
        // 以下代码注释后，多个下拉框可同时显示
      for (var i = 0; i < aStoreToggle.length; i++) {
        if ('#' + $(this).attr('id') !== aStoreToggle[i]) {
          $(aStoreToggle[i]).addClass('btn-link');
          $(aStoreToggle[i]).parents('.btn-group').removeClass('open');
        }
      }
    });
  };
});
