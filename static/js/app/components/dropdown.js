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
      oBindDropdown._bind(toggleBtn);
      oBindDropdown._saveToggle(toggleBtn,parent);
      // 最后一个绑定事件触发_reset()方法
      if (last) oBindDropdown._reset();
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
    // 点击下拉列表元素，切换浏览器URL中的pid
    _switch: function() {
      $('#tm-list').on('click', '.tm-panel-item', function(event) {
        event.preventDefault();
        /* Act on the event */
        var nPid = $(this).data('id');
        var sSearch = window.location.search.replace(/[^\=]+$/,nPid);
        window.location.search = sSearch;
      });
    },
    _reset: function () {
      // 临时放在这里
      oBindDropdown._switch();
      // 点击空白地方收起标题列表
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
    // 临时保存触发元素和触发范围
    _saveToggle:function (toggleBtn,parent) {
      aStoreToggle.push(toggleBtn);
      aStoreToggleParent.push(parent);
    }
  };
  return {
    init:oBindDropdown.init
  };
});
