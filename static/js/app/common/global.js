/**
 * @title 全局文件
 * @fileOverView 作为 RequireJS 模块与 AngularJS 程序之间的中转
 *  1.AngularJS 将 token 临时保存在这里，RequireJS 从这里获取 token。
 *  2.AngularJS 中关闭模态框
 * @author whdstyle@gmail.com
 */

// 立即执行函数，避免暴露私有成员。
var globalModule = (function () {
  var oModule = {};
  var sToken = false;
  // 关闭模态框
  oModule.closeModal = function () {
    var eModal = document.getElementById('sign-modal');
    var eFrame = eModal.getElementsByTagName('iframe');
    eFrame[0].src = '';
    // 监听onload事件，判断iframe中的页面加载完毕
    // iframe元素加载完成后，隐藏模态框
    if (eFrame[0].attachEvent) {
      eFrame[0].attachEvent('onload', function () {
        $(eModal).modal('hide');
      });
    } else {
      eFrame[0].onload = function () {
        $(eModal).modal('hide');
      };
    }
  };

  // 要在requireJS的模块内将token保存到cookie中，所以这里只负责暂存token，供requireJS模块获取
  // 暂存token
  oModule.tempToken = function (token) {
    sToken = token;
  };

  // 销毁暂存token
  oModule.deleteToken = function () {
    sToken = false;
  };

  // 获取暂存的token
  // 这里的token只存在于登陆成功后，页面刷新前。
  oModule.getToken = function () {
    return sToken;
  };
  return oModule;
})();
