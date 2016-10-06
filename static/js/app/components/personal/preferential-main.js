define(function(require) {
  var $ = require('jquery'),
      mApi = require('components/api'),
      mData = require('components/personal/data'),
      mAlert = require('components/alert'),
      tplPreferentialMain = require('tpl/personal/preferential-main'),
      tplPreferentialMine = require('tpl/personal/preferential-mine');

  var oPreferential = {};

  // 加载内容
  oPreferential.loadContent = function(userData,token_p) {
    // 渲染主内容模板
    document.getElementById('mainbar').innerHTML = tplPreferentialMain();
    // 绑定相关事件
    oPreferential._bind(token_p);
    // 获取优惠券列表，渲染模板。
    mApi.getCouponList(1,token_p)
    .done(function(success) {
      // 重新组织 优惠券列表 的数据
      console.log(success);
      var preferentialData = mData.regroupPreferential();
      // 渲染优惠券列表
      document.getElementById('preferential-mine').innerHTML = tplPreferentialMine(success.data);
    })
    .fail(function(error) {
      // 临时处理方式
      mAlert.error(error);
    });
  };
  // 绑定事件
  oPreferential._bind = function(token_p) {
    // 兑换抵用券事件
    // CDkey-btn
    $('#CDkey-btn').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      var nCDkey = $('#CDkey-input').val();
      if (nCDkey !== '') {
        mApi.getCoupon(nCDkey,token_p)
        .done(function(success) {
          mAlert.success('兑换成功');
          console.log(success);
        })
        .fail(function(error) {
          mAlert.error('兑换失败');
          console.log(error);
        });
      }
    });
  };



  return oPreferential;
});
