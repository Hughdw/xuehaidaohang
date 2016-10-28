/**
 * 配合personal-center-main.js加载
 * 优惠信息
 */
define(function (require) {
  var $ = require('jquery');
  var mApi = require('components/api');
  var mRegroupData = require('components/personal/regroup-data');
  var mAlert = require('components/alert');
  var tplPreferentialMain = require('tpl/personal/preferential-main');
  var tplPreferentialMine = require('tpl/personal/preferential-mine');

  var oPreferential = {};

  // 加载内容
  oPreferential.loadContent = function (userData, tokenP) {
    // 渲染主内容模板
    document.getElementById('mainbar').innerHTML = tplPreferentialMain();
    // 绑定相关事件
    oPreferential._bind(tokenP);
    // 获取优惠券列表，渲染模板。
    mApi.getCouponList(1, tokenP)
    .done(function (success) {
      // 重新组织 优惠券列表 的数据
      console.log(success);
      var preferentialData = mRegroupData.preferential();
      // 渲染优惠券列表
      document.getElementById('preferential-mine').innerHTML = tplPreferentialMine(success.data);
    })
    .fail(function (error) {
      // 临时处理方式
      mAlert.error(error);
    });
  };
  // 绑定事件
  oPreferential._bind = function (tokenP) {
    // 兑换抵用券事件
    // CDkey-btn
    $('#CDkey-btn').on('click', function (event) {
      event.preventDefault();

      var nCDkey = $('#CDkey-input').val();
      if (nCDkey !== '') {
        mApi.getCoupon(nCDkey, tokenP)
        .done(function (success) {
          mAlert.success('兑换成功');
          console.log(success);
        })
        .fail(function (error) {
          mAlert.error('兑换失败');
          console.log(error);
        });
      }
    });
  };


  return oPreferential;
});
