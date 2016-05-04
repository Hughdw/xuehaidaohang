/**
 * define函数用来定义模块
 * 按钮事件绑定组件
 */
 //
define(function (require) {
  var $ = require('jquery');

  var oButton = {
    btnTxt : {
      'avatar':['取消','设置','修改'],
      'nickname':['取消','设置','修改'],
      'password':['取消','设置','修改'],
      'mobile':['取消','绑定','更换绑定'],
      'email':['取消','绑定','更换绑定']
    },
    bindEvent : function(lk,cl,set) {
      var self = this;
      var $Collapse = $(cl);
      var sLinkClassName = lk;
      var bSetDone = set;
      var aBtnType = /[^\-]+$/.exec(lk);//获取最后一个“-”之后的字符串，e.g. collapse-link-avatar => avatar
      $(document).on('click',sLinkClassName,function(event) {
        // event.stopPropagation();//阻止 冒泡会影响browersync工具的多窗口同步，暂时注释
        $Collapse.collapse({
          parent:'#accordion'
        });
        $Collapse.collapse('toggle');
      });

      $Collapse.on('show.bs.collapse',function() {
        var $Self = $(this);
        var $Prev = $Self.prev();
        // body...
        if (bSetDone === null) {
          $Prev.addClass('al-tit-active').find('.collapse-link').text(self.btnTxt[aBtnType][0]);
        }else if (bSetDone) {//已设置
          $Prev.addClass('al-tit-active').find('.collapse-link').text(self.btnTxt[aBtnType][0]);
          $Self.find('.collapse-edit').removeClass('hidden');
        } else {//未设置
          $Prev.addClass('al-tit-active').find('.collapse-link').text(self.btnTxt[aBtnType][0]);
          $Self.find('.collapse-default').removeClass('hidden');
        }
      });
      $Collapse.on('hide.bs.collapse',function() {
        // var $Self = $(this);
        var $Prev = $(this).prev();
        // body...
        if (bSetDone || bSetDone === null) {
          $Prev.removeClass('al-tit-active').find('.collapse-link').text(self.btnTxt[aBtnType][2]);
        } else {
          $Prev.removeClass('al-tit-active').find('.collapse-link').text(self.btnTxt[aBtnType][1]);
        }
      });
    }
  };
  // var fnBtnEvent = function (lk,cl,set) {};
  return oButton;
});
