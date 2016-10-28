/**
 * 配合personal-center-main.js加载
 * 充值记录
 */
define(function (require) {
  var mApi = require('components/api');
  var mRegroupData = require('components/personal/regroup-data');
  var mAlert = require('components/alert');
  var tplAccountMain = require('tpl/personal/account-main');

  var oRecharge = {};

  // 加载内容
  oRecharge.loadContent = function (userData, tokenP) {
    // 获取充值信息
    mApi.getHistory(1, tokenP)
    .done(function (success) {
      // 重新组织 充值 的数据
      console.log(success);
      // var accountData = mRegroupData.progress(success.data,userData);
      // document.getElementById('mainbar').innerHTML = tplAccountMain(accountData);
      // oRecharge._bind(accountData,token_p);
      // replaceImgPath();
    })
    .fail(function () {

    });
  };
  // 绑定事件
  oRecharge._bind = function (setDone, tokenP) {

  };


  return oRecharge;
});
