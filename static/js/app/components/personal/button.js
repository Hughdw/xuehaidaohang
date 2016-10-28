/**
 * 按钮事件绑定组件
 */
define(function (require) {
  var $ = require('jquery');

  var oButton = {
    // 按钮的文字
    btnTxt: {
      'avatar': ['取消', '设置', '修改'],
      'nickname': ['取消', '设置', '修改'],
      'password': ['取消', '设置', '修改'],
      'mobile': ['取消', '绑定', '更换绑定'],
      'email': ['取消', '绑定', '更换绑定']
    },
    bindEvent: function (linkBtn, collapse, type, seted, cancelFn) {
      var self = this;
      var jqCollapse = $(collapse);
      // 是否已设置
      // false 按钮文字为 设置/取消的切换
      // true 按钮文字为 修改/取消的切换
      var bSeted = seted;
      // 获取最后一个“-”之后的字符串，e.g. collapse-link-avatar => avatar
      var aBtnType = type;
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
        jqPrev.addClass('account-tit-active').find('.collapse-link').text(self.btnTxt[aBtnType][0]);
        // 控制 绑定手机/邮箱 的内容显示
        if (bSeted) {
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
        // var jqSelf = $(this);
        var jqPrev = $(this).prev();
        // 按钮的文字切换
        if (bSeted) {
          // 按钮的文字切换为 修改/更换绑定
          jqPrev.removeClass('account-tit-active').find('.collapse-link').text(self.btnTxt[aBtnType][2]);
        } else {
          // 按钮的文字切换为 设置
          jqPrev.removeClass('account-tit-active').find('.collapse-link').text(self.btnTxt[aBtnType][1]);
        }
        // 取消按钮触发的函数
        if ($.isFunction(cancelFn)) {
          cancelFn();
        }
      });
    }
  };
  return oButton;
});
