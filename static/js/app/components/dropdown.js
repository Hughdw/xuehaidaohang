/**
 * 下拉窗口事件绑定
 */
 // 通过注册绑定事件记录事件绑定的总数，最后一个事件绑定触发后执行空白点击事件
define(function (require) {
  var $ = require('jquery');

  // 存放切换对象
  var _aStoreToggle = [];
  // 存放切换对象的父元素
  var _aStoreToggleParent = [];
  // 点击空白地方收起标题列表
  $(document).on('click', function (event) {
    var jqTarget = $(event.target);
    for (var i = 0; i < _aStoreToggleParent.length; i++) {
      // 点击目标不是 激活区域 就还原成下拉框的初始状态
      if (jqTarget.parents(_aStoreToggleParent[i]).length === 0) {
        $(_aStoreToggle[i]).addClass('btn-link');
        $(_aStoreToggle[i]).parents('.btn-group').removeClass('open');
      }
    }
  });
  var oDropdownMenu = {
    // 目标绑定点击事件
    handle: function (toggleBtn, parent) {
      // 保存触发元素和触发范围
      _aStoreToggle.push(toggleBtn);
      _aStoreToggleParent.push(parent);
      $(toggleBtn).on('click', function (event) {
        $(this).parents('.btn-group').toggleClass('open');
        $(this).toggleClass('btn-link');
        // 停止冒泡
        event.stopPropagation();
        // 隐藏其他显示的下拉框
        // 以下代码注释后，多个下拉框可同时显示
        for (var i = 0; i < _aStoreToggle.length; i++) {
          if ('#' + $(this).attr('id') !== _aStoreToggle[i]) {
            $(_aStoreToggle[i]).addClass('btn-link');
            $(_aStoreToggle[i]).parents('.btn-group').removeClass('open');
          }
        }
      });
    }
  };
  return {
    handle: oDropdownMenu.handle
  };
});
