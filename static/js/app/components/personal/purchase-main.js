define(function(require) {
  var mApi = require('components/api'),
      mData = require('components/personal/data'),
      mAlert = require('components/alert'),
      tplAccountMain = require('tpl/personal/account-main');

  var oPurchase = {};

  // 加载内容
  oPurchase.loadContent = function(userData,token_p) {
    // 获取购买信息
    mApi.getHistory(1,token_p)
    .done(function(success) {
      // 重新组织 购买 的数据
      console.log(success);
      // var accountData = mData.regroupProgress(success.data,userData);
      // document.getElementById('mainbar').innerHTML = tplAccountMain(accountData);
      // oPurchase._bind(accountData,token_p);
      // replaceImgPath();
    })
    .fail(function(error) {

    });
  };
  // 绑定事件
  oPurchase._bind = function(setDone,token_p) {

  };



  return oPurchase;
});
