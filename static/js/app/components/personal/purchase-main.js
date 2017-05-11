/**
 * @title 购买记录
 * @fileOverView 本文件用于加载购买记录页面的内容，实现了相关按钮的事件绑定和内容渲染。
 * @other 配合personal-center-main.js加载
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var mApi = require('components/api');
  var mRegroupData = require('components/personal/regroup-data');
  var mAlert = require('components/alert');

 // ************************************
 // 声明
 // ************************************
  var oPurchase = {};

 // ************************************
 // 内部方法
 // ************************************
  // 绑定事件
  oPurchase._bind = function (setDone, token) {

  };

 // ************************************
 // 对外暴露方法
 // ************************************
  // 加载内容
  oPurchase.loadContent = function (userData, token) {
    // 获取购买信息
    mApi.getHistory(1, token)
    .done(function (success) {
      // 重新组织 购买 的数据
      // var accountData = mRegroupData.progress(success.data,userData);
      // document.getElementById('mainbar').innerHTML = tplAccountMain(accountData);
      // oPurchase._bind(accountData,token_p);
    })
    .fail(function () {

    });
  };



  return oPurchase.loadContent;
});
