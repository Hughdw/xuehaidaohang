/**
 * 配合personal-center-main.js加载
 * 购买记录
 */
define(function (require) {
  var mApi = require('components/api');
  var mRegroupData = require('components/personal/regroup-data');
  var mAlert = require('components/alert');
  var tplAccountMain = require('tpl/personal/account-main');

  var oPurchase = {};

  // 加载内容
  oPurchase.loadContent = function (userData, tokenP) {
    // 获取购买信息
    mApi.getHistory(1, tokenP)
    .done(function (success) {
      // 重新组织 购买 的数据
      console.log(success);
      // var accountData = mRegroupData.progress(success.data,userData);
      // document.getElementById('mainbar').innerHTML = tplAccountMain(accountData);
      // oPurchase._bind(accountData,token_p);
      // replaceImgPath();
    })
    .fail(function () {

    });
  };
  // 绑定事件
  oPurchase._bind = function (setDone, tokenP) {

  };


  return oPurchase;
});
