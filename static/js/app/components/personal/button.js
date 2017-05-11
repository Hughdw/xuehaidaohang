/**
 * @title 按钮事件绑定模块
 * @fileOverView 本文件用于为按钮绑定对应的事件，同时切换显示文字。
 * @other 配合account-main.js使用。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');

 // ************************************
 // 声明
 // ************************************
  // 按钮的文字
  var btnTxt = {
    'avatar': ['取消', '设置', '修改'],
    'nickname': ['取消', '设置', '修改'],
    'password': ['取消', '设置', '修改'],
    'mobile': ['取消', '绑定', '更换绑定'],
    'email': ['取消', '绑定', '更换绑定']
  };

 // ************************************
 // 对外暴露方法
 // ************************************
  // type 按钮类型 对应 btnTxt 的属性。
  // seted 是否已经设置内容
  // false 按钮文字为 设置/取消的切换
  // true 按钮文字为 修改/取消的切换
  return function (linkBtn, collapse, type, seted, cancelFn) {
    var jqCollapse = $(collapse);
    // 获取最后一个“-”之后的字符串，e.g. collapse-link-avatar => avatar
    linkBtn.on('click', function (event) {
      event.preventDefault();
      jqCollapse.collapse({
        parent: '#accordion'
      });
      jqCollapse.collapse('toggle');
    });
    jqCollapse.on('show.bs.collapse', function () {
      var jqSelf = $(this);
      var jqPrev = jqSelf.prev();
        // 按钮的文字切换为 取消
      jqPrev.addClass('account-tit-active').find('.collapse-link').text(btnTxt[type][0]);
        // 控制 绑定手机/邮箱 的内容显示
      if (seted) {
          // 信息是已设置状态，可以进行修改。
          // 绑定手机/邮箱，显示修改相关HTML结构。
        jqSelf.find('.collapse-edit').removeClass('hidden');
      } else {
          // 信息是未设置状态，可进行第一次设置。
          // 绑定手机/邮箱，显示第一次设置相关HTML结构。
        jqSelf.find('.collapse-default').removeClass('hidden');
      }
    });
    jqCollapse.on('hide.bs.collapse', function () {
      var jqPrev = $(this).prev();
        // 按钮的文字切换
      if (seted) {
          // 按钮的文字切换为 修改/更换绑定
        jqPrev.removeClass('account-tit-active').find('.collapse-link').text(btnTxt[type][2]);
      } else {
          // 按钮的文字切换为 设置
        jqPrev.removeClass('account-tit-active').find('.collapse-link').text(btnTxt[type][1]);
      }
        // 取消按钮触发的函数
      if ($.isFunction(cancelFn)) {
        cancelFn();
      }
    });
  };
});
