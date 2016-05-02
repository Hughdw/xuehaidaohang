/**
 * define函数用来定义模块
 * 按钮事件绑定组件
 */
 //
define(function (require) {
  var $ = require('jquery');
  var fnBtnEvent = function (lk,cl,set) {
    var $Collapse = $(cl);
    var sLinkClassName = lk;
    var bSetDone = null || set;
    var oBtnTxt = {
      'avatar':['取消','设置','修改'],
      'nickname':['取消','设置','修改'],
      'password':['取消','设置','修改'],
      'mobile':['取消','绑定','更换绑定'],
      'email':['取消','绑定','更换绑定']
    };
    //获取最后一个“-”之后的字符串，e.g. collapse-link-avatar => avatar
    var aBtnType = /[^\-]+$/.exec(lk);
    $(document).on('click',sLinkClassName,function(event) {
      // event.stopPropagation();//阻止 冒泡会影响browersync工具的多窗口同步，暂时注释
      $Collapse.collapse({
        parent:'#accordion'
      });
      $Collapse.collapse('toggle');
    });
    $Collapse.on('shown.bs.collapse',function() {
      // body...
      $(this).prev().addClass('al-tit-active').find('.collapse-link').text(oBtnTxt[aBtnType][0]);
    });
    $Collapse.on('hidden.bs.collapse',function() {
      // body...
      $(this).prev().removeClass('al-tit-active').find('.collapse-link').text(oBtnTxt[aBtnType][2]);
    });
  };
  return fnBtnEvent;
});
