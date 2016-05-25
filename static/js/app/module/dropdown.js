/**
 * define函数用来定义模块
 * 下拉窗口事件绑定
 */
define(function (require) {
  var $ = require('jquery');
  var aStoreToggle = [];
  var aStoreToggleParent = [];
  var oBindDropdown = {
    init:function (toggleBtn,parent,last) {
      this._bind(toggleBtn);
      this._saveToggle(toggleBtn,parent);
      if (last) this._reset();
    },
    _bind: function(toggleBtn) {
        $(toggleBtn).on('click',function (event) {
          $(this).parents('.btn-group').toggleClass('open');
          $(this).toggleClass('btn-link');
          // 停止冒泡
          event.stopPropagation();
          // 隐藏其他显示的下拉框
          // 以下代码注释后，多个下拉框可同时显示
          for (var i = 0; i < aStoreToggle.length; i++) {
            if ('#'+$(this).attr('id') !== aStoreToggle[i]) {
              $(aStoreToggle[i]).addClass('btn-link');
              $(aStoreToggle[i]).parents('.btn-group').removeClass('open');
            }
          }
        });
    },
    _reset: function () {
        // 空白处隐藏指定元素
        $(document).on('click',function(event) {
          var $Target = $(event.target);
          for (var i = 0; i < aStoreToggleParent.length; i++) {
            if ($Target.parents(aStoreToggleParent[i]).length == '0') {
              // 还原，收回
              $(aStoreToggle[i]).addClass('btn-link');
              $(aStoreToggle[i]).parents('.btn-group').removeClass('open');
            }
          }
        });
    },
    _saveToggle:function (tb,tbp) {
      aStoreToggle.push(tb);
      aStoreToggleParent.push(tbp);
    }
  };
  return {
    init:oBindDropdown.init,
    _bind:oBindDropdown._bind,
    _reset:oBindDropdown._reset,
    _saveToggle:oBindDropdown._saveToggle
  };
});
