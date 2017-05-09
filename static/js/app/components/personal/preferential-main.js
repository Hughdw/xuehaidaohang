/**
 * @title 优惠信息
 * @fileOverView 本文件用于加载优惠信息页面的内容，实现了相关按钮的事件绑定和内容渲染。
 * @other 配合personal-center-main.js加载
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var mApi = require('components/api');
  var mRegroupData = require('components/personal/regroup-data');
  var mAlert = require('components/alert');
  var tplPreferentialMain = require('tpl/personal/preferential-main');
  var tplPreferentialMine = require('tpl/personal/preferential-mine');

 // ************************************
 // 声明
 // ************************************
  var oPreferential = {};
 // ************************************
 // 内部方法
 // ************************************
  // 绑定事件
  oPreferential._bind = function (token) {
    // 兑换抵用券事件
    // CDkey-btn
    $('#CDkey-btn').on('click', function (event) {
      event.preventDefault();
      var nCDkey = $('#CDkey-input').val();
      if (nCDkey !== '') {
        mApi.getCoupon(nCDkey, token)
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

 // ************************************
 // 对外暴露方法
 // ************************************
  // 加载内容
  oPreferential.loadContent = function (userData, token) {
    // 渲染主内容模板
    document.getElementById('mainbar').innerHTML = tplPreferentialMain();
    // 绑定相关事件
    oPreferential._bind(token);
    // 获取优惠券列表，渲染模板。
    mApi.getCouponList(1, token)
    .done(function (success) {
      // 重新组织 优惠券列表 的数据
      var preferentialData = mRegroupData.preferential();
      // 渲染优惠券列表
      document.getElementById('preferential-mine').innerHTML = tplPreferentialMine(success.data);
    })
    .fail(function (error) {
      // 临时处理方式
      mAlert.error(error);
    });
  };

  return oPreferential.loadContent;
});
