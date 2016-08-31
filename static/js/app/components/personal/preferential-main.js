define(function(require) {
  var mApi = require('components/api'),
      mData = require('components/personal/data'),
      mAlert = require('components/alert'),
      tplPreferentialMain = require('tpl/personal/preferential-main');

  var oPreferential = {};

  // 加载内容
  oPreferential.loadContent = function(userData,token_p) {
    // 获取优惠信息
    mApi.getCouponList(1,token_p)
    .done(function(success) {
      // 重新组织 优惠券列表 的数据
      console.log(success);
    })
    .fail(function(error) {

    });
  };
  // 绑定事件
  oPreferential._bind = function(setDone,token_p) {

  };



  return oPreferential;
});
