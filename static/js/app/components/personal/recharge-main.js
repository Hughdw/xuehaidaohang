define(function(require) {
  var mApi = require('components/api'),
      mData = require('components/personal/data'),
      mAlert = require('components/alert'),
      tplAccountMain = require('tpl/personal/account-main');

  var oRecharge = {};

  // 加载内容
  oRecharge.loadContent = function(userData,token_p) {
    // 获取充值信息
    mApi.getHistory(1,token_p)
    .done(function(success) {
      // 重新组织 充值 的数据
      console.log(success);
      // var accountData = mData.regroupProgress(success.data,userData);
      // document.getElementById('mainbar').innerHTML = tplAccountMain(accountData);
      // oRecharge._bind(accountData,token_p);
      // replaceImgPath();
    })
    .fail(function(error) {

    });
  };
  // 绑定事件
  oRecharge._bind = function(setDone,token_p) {

  };



  return oRecharge;
});
