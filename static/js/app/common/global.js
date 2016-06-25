// 关闭登录窗口的全局函数
var globalModule = (function() {
  var oModule = {};
  var sToken = false;
  // 关闭模态框
  oModule.closeModal = function (){
    var eModal = document.getElementById('sign-modal');
    var eFrame = eModal.getElementsByTagName('iframe');
    eFrame[0].src="";
    // 监听onload事件，判断iframe中的页面加载完毕
    // iframe元素加载完成后，隐藏模态框
    if(eFrame[0].attachEvent){
      eFrame[0].attachEvent('onload',function() {
        // body...
        $(eModal).modal('hide');
      });
    }else{
      eFrame[0].onload = function() {
        $(eModal).modal('hide');
      };
    }
  };

  // 要在requireJS的模块内设置cookie，所以这里只负责暂存token，供requireJS模块获取
  // 暂存token
  oModule.transferToken = function(token) {
    sToken = token;
  };
  // 供requireJS的模块获取token
  oModule.getToken = function() {
    return sToken;
  };
  return oModule;
})();
