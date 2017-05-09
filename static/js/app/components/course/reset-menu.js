/**
 * @title 重置Menu模块
 * @fileOverView 本文件用于当窗口的尺寸发生改变时，重置course-list.html中 Menu 的尺寸。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var mUtil = require('components/util');

 // ************************************
 // 声明
 // ************************************
  var resizeMenu = {};

 // ************************************
 // 内部方法
 // ************************************
  // 初始化当前屏幕的高度和操作对象的高度
  resizeMenu._init = function (ele) {
    var nScreenH = window.innerHeight;
    var nTabContH = ele.offsetHeight;
    return {
      screenH: nScreenH,
      tabContH: nTabContH
    };
  };
  // 通过对当前 文档高度 和 操作对象 的高度判断，决定是否更改对象的高度
  resizeMenu._reset = function (ele) {
    var oHeight = resizeMenu._init(ele);
    var nScreenH = oHeight.screenH;
    var nTabContH = oHeight.tabContH;
    // 内容高度是通过 文档高度 减去 nav高度 和 menu tab高度 算出来的
    var nMenuHeight = 30; // 筛选列表TAG高度
    var nNavHeight = 50; // 导航高度
    var nSetHeight = (nScreenH - nMenuHeight - nNavHeight);
    if (nSetHeight <= nTabContH) {
      ele.style.height = nSetHeight - 5 + 'px';
    } else {
      ele.style.height = 'auto';
    }
  };
  // 绑定需要触发重置menu高度的事件
  resizeMenu._bindEve = function (ele) {
    var nTimer = 0;
    // 窗口发生变化时候，重置高度
    $(window).resize(function () {
      if (mUtil.isPC) {
        clearTimeout(nTimer);
        nTimer = setTimeout(function () {
          resizeMenu._reset(ele);
        }, 500);
      } else {
        resizeMenu._reset(ele);
      }
    });
    // 点击按钮时，重置高度
    $('#tab-content').on('click', '.menu-filter-bt', function () {
      event.preventDefault();
      resizeMenu._reset(ele);
    });
    // 切换TAB时，重置高度
    $('#menu-tabs').on('click', '.menu-tab', function (event) {
      event.preventDefault();
      resizeMenu._reset(ele);
    });
  };
 // ************************************
 // 对外暴露方法
 // ************************************
  resizeMenu.render = function (tabContent) {
    var eTabCont = document.getElementById(tabContent);
    resizeMenu._reset(eTabCont);
    resizeMenu._bindEve(eTabCont);
  };

  return resizeMenu.render;
});
