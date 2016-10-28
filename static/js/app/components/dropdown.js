/**
 * 下拉窗口事件绑定
 */
 // 通过注册绑定事件记录事件绑定的总数，最后一个事件绑定触发后执行空白点击事件
define(function (require) {
  var $ = require('jquery');
  // 绑定元素的总数
  var nElementTotal = 0;
  // 实际绑定成功元素的总数
  var nBindTotal = 0;
  var aStoreToggle = [];
  var aStoreToggleParent = [];
  var oBindDropdown = {
    // 临时保存触发元素和触发范围
    reg: function (toggleBtn, parent) {
      aStoreToggle.push(toggleBtn);
      aStoreToggleParent.push(parent);
      nElementTotal = ++nElementTotal;
    },
    // 目标绑定点击事件
    bind: function (toggleBtn, fn) {
      $(toggleBtn).on('click', function (event) {
        $(this).parents('.btn-group').toggleClass('open');
        $(this).toggleClass('btn-link');
        // 停止冒泡
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
      nBindTotal = ++nBindTotal;
      if ($.isFunction(fn)) {
        fn();
      }
      // 绑定数达到注册事件总数时，绑定空白地方的触发事件
      if (nBindTotal === nElementTotal) {
        // 点击空白地方收起标题列表
        $(document).on('click', function (event) {
          var $Target = $(event.target);
          for (var i = 0; i < aStoreToggleParent.length; i++) {
            // 点击目标不是 激活区域 就还原成下拉框的初始状态
            if ($Target.parents(aStoreToggleParent[i]).length === '0') {
              $(aStoreToggle[i]).addClass('btn-link');
              $(aStoreToggle[i]).parents('.btn-group').removeClass('open');
            }
          }
        });
      }
    }
  };
  return {
    bind: oBindDropdown.bind,
    reg: oBindDropdown.reg
  };
});
