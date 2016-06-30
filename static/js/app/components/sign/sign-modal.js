//

define(function(require) {
  var $ = require('jquery'),
      mAuth = require('./auth'),
      tplSignAppend = require('tpl/public/sign-append');
  // body...
  var eModal,eFrame,oFrameWin;
  var fnBindModal = function(btn) {
    btn.on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      // 获取登录模态框的HTML（iframe）
      var str = tplSignAppend();
      var jqBtn = $(this);
      // 插入HTML，避免重复创建
      if (!eModal) {
        $('body').append(str);
        // 获取 模态框对象
        eModal = document.getElementById('sign-modal');
        // 获取到插入的iframe元素对象
        eFrame = eModal.getElementsByTagName('iframe');
        // 获取到创建的子窗口的window对象
        oFrameWin = eFrame[0].contentWindow;

        // 创建监听事件，监听模态框隐藏
        $(eModal).on('hidden.bs.modal', function(event) {
          event.preventDefault();
          /* Act on the event */
          // 窗口关闭后，判断是否登录成功
          // 登录成功后，登录窗口会把token传递到调用登录窗口的页面（当前页面），通过globalModule获取
          var token = globalModule.getToken();
          // 调用login方法
          if (token) mAuth.login(token);
        });
      }
      // 设置src属性
      eFrame[0].src = 'login-angular.html#/'+jqBtn.data('whatever');
      // 监听onload事件，判断iframe中的页面加载完毕
      // 加载完成后，显示模态框
      if(eFrame[0].attachEvent){
        eFrame[0].attachEvent('onload',function() {
          $(eModal).modal('show','handleUpdate');
        });
      }else{
        eFrame[0].onload = function() {
          $(eModal).modal('show','handleUpdate');
        };
      }
    });
  };
  return fnBindModal;
})
