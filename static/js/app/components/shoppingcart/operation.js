/**
 * @title 购物车操作模块
 * @fileOverView 本文件用于购物车中视频的增加，删除，查询。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var mApi = require('components/api');
  var tplMiniList = require('tpl/shoppingcart/mini-list');
  var tplMiniListItem = require('tpl/shoppingcart/mini-list-item');
  var Cookies = require('jq-cookie');

 // ************************************
 // 声明
 // ************************************
  var aMiniCartCache;// 迷你购物车中的数据缓存

 // ************************************
 // 对外暴露方法
 // ************************************
  var oShoppingOperation = {
    // 更新购物车 和 cookies 中的商品数量
    updateCount: function (updateNum) {
      var nCount = parseInt(Cookies.get('cartCount')) + updateNum;
      $('#sc-btn').find('.badge').text(nCount);
      Cookies.set('cartCount', nCount);
    },
    // 显示/隐藏 购物车为空时候的提示
    switchEmptyBg: function () {
      if (aMiniCartCache.length === 0) {
        $('#sc-empty').show();
      } else {
        $('#sc-empty').hide();
      }
    },
    // 向购物车中添加商品
    add: function (pid, tit, subtit, fn, qty) {
      var nQty = qty || 1;
      var oData = {
        pid: pid,
        num: tit,
        title: subtit,
        qty: nQty
      };
      var oSelf = this;
      oSelf.updateCount(1);
      mApi.addToCart(pid)
      .done(function (success) {
        // 查询当前添加的商品在购物车列表中是否存在。
        // 1.存在则增加数量。
        for (var i = 0; i < aMiniCartCache.length; i++) {
          if (aMiniCartCache[i].pid === pid) {
            ++aMiniCartCache[i].qty;
            $('#miniCart-id-' + pid).find('span.sc-qty em').text(aMiniCartCache[i].qty);
            oData = null;
          }
        }
        // 2.不存在则新增一条数据。
        if (oData !== null) {
          aMiniCartCache.push(oData);
          $('#sc-list').prepend(tplMiniListItem(oData));
        }
        // 加入成功恢复按钮状态，同时进行提示
        if ($.isFunction(fn)) {
          fn();
        }
        oSelf.switchEmptyBg();
      })
      .fail(function () {
        alert('添加商品错误');
        oSelf.updateCount(-1);
      });
    },
    // 从购物车中删除商品
    remove: function (pid) {
      var oSelf = this;
      // 暂时隐藏HTML
      $('#sc-list').find('#miniCart-id-' + pid).hide();
      mApi.removeToCart(pid)
      .done(function (success) {
        // 删除HTML
        $('#sc-list').find('#miniCart-id-' + pid).remove();
        // 从总数中减去删除商品的数量
        for (var i = 0; i < aMiniCartCache.length; i++) {
          if (aMiniCartCache[i].pid === pid) {
            oSelf.updateCount(-aMiniCartCache[i].qty);
            // 删除数据
            aMiniCartCache.splice(i, 1);
          }
        }
        oSelf.switchEmptyBg();
      })
      .fail(function () {
        // 删除失败，恢复显示
        $('#sc-list').find('#miniCart-id-' + pid).show();
        alert('删除失败');
      });
    },
    // 加载迷你购物车商品列表
    loadMiniCart: function (fn) {
      // 获取mini购物车列表
      mApi.getMiniCart()
      .done(function (success) {
        // 购物车的数据
        aMiniCartCache = success.data.miniCart;
        // 渲染数据
        document.getElementById('shopping').innerHTML = tplMiniList(success.data);
        // 保存cookies
        Cookies.set('cartCount', success.data.count);
        // 委派事件：删除购物车中的商品
        $('#sc-list').delegate('a.btn-del', 'click', function (event) {
          var jqSelf = $(this);
          oShoppingOperation.remove(jqSelf.data('pid'));
        });
        // 执行传入的函数
        if ($.isFunction(fn)) {
          fn();
        }
      })
      .fail(function () {
        alert('购物车加载失败');
      });
    },
    // 加载购物车商品列表
    loadCart: function () {
      mApi.getCart()
      .done(function (success) {
        console.log(success);
      })
      .fail(function () {

      });
    }
  };
  return oShoppingOperation;
});
