define(function (require) {
  var $ = require('jquery'),
      tplSignAppend = require('tpl/public/sign-append');
  $(function() {

    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中
    // document.getElementById('sign-modal').innerHTML = tplSign();

    // 注册方式切换 手机/邮箱
    // jqSignModal.on('click', '.tab-list a', function(event) {
    //   event.preventDefault();
    //   /* Act on the event */
    //   $(this).tab('show');
    // });
    //
    // // 点击.signin-btn按钮切换模态框显示为登录
    // jqSignModal.on('click', '.signin-btn', function(event) {
    //   event.preventDefault();
    //   /* Act on the event */
    //   var $Button = $(event.currentTarget);
    //   mSign.switchShowModal($Button,jqSignModal);
    // });
    // // 点击#signup-btn按钮切换模态框显示为注册
    // jqSignModal.on('click', '#signup-btn', function(event) {
    //   event.preventDefault();
    //   /* Act on the event */
    //   var $Button = $(event.currentTarget);
    //   mSign.switchShowModal($Button,jqSignModal);
    // });

    // BS 模态框显示事件
    // 通过 event.relatedTarget 可以访问到触发事件的元素
    // jqSignModal.on('show.bs.modal',function(event) {
    //   var $Button = $(event.relatedTarget);
    //   // mSign.switchShowModal($Button,jqSignModal);
    // });

    var eModal,eFrame,oFrameWin;
    $('#sign-up,#sign-in').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      // 获取模板
      var str = tplSignAppend();
      var jqBtn = $(this);
      // 插入HTML
      if (!eModal) {
        $('body').append(str);
        eModal = document.getElementById('sign-modal');
        eFrame = eModal.getElementsByTagName('iframe');
        oFrameWin = eFrame[0].contentWindow;
      }
      // 设置src属性
      eFrame[0].src = '/login-angular.html#/'+jqBtn.data('whatever');
      // 监听onload事件，判断iframe中的页面加载完毕
      if(eFrame[0].attachEvent){
        eFrame[0].attachEvent('onload',function() {
          // body...
          // console.log(oFrameWin.test1);
        });
      }else{
        eFrame[0].onload = function() {
          // console.log(eFrame[0].src);

          oFrameWin.fnSwitchShowModal(jqBtn);
        };
      }
      $(eModal).modal('show');
    });
  });
});
