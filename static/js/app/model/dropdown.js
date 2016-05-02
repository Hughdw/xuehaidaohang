/**
 * define函数用来定义模块
 * 下拉窗口事件绑定
 */
define(function (require) {
  var $ = require('jquery');
  var aToggle = [];
  var aToggleParent = [];
  var bindDropdown = {
    init:function (toggleBtn,parent,last) {
      this._bind(toggleBtn);
      this._saveToggle(toggleBtn,parent);
      if (last) this._reset();
    },
    _bind: function(toggleBtn) {
        $(toggleBtn).on('click',function (event) {
          $(this).parents('.btn-group').toggleClass('open');
          $(this).toggleClass('btn-link');

          event.stopPropagation();
          // 隐藏其他显示的下拉框
          // 以下代码注释后，多个下拉框可同时显示
          for (var i = 0; i < aToggle.length; i++) {
            if ('#'+$(this).attr('id') !== aToggle[i]) {
              $(aToggle[i]).addClass('btn-link');
              $(aToggle[i]).parents('.btn-group').removeClass('open');
            }
          }
        });
    },
    _reset: function () {
        // 空白处隐藏指定元素
        $(document).on('click',function(event) {
          var target = $(event.target);
          for (var i = 0; i < aToggleParent.length; i++) {
            if (target.parents(aToggleParent[i]).length == '0') {
              // 还原，收回
              $(aToggle[i]).addClass('btn-link');
              $(aToggle[i]).parents('.btn-group').removeClass('open');
            }
          }
        });
    },
    _saveToggle:function (tb,tbp) {
      aToggle.push(tb);
      aToggleParent.push(tbp);
    }
  };
  return {
    init:bindDropdown.init,
    _bind:bindDropdown._bind,
    _reset:bindDropdown._reset,
    _saveToggle:bindDropdown._saveToggle
  };
});
