define(function(require) {
  var mApi = require('components/api'),
      tplMiniList = require('tpl/shoppingcart/mini-list'),
      tplMiniListItem = require('tpl/shoppingcart/mini-list-item'),
      Cookies = require('jq-cookie');

  var oShoppingCart = {
    // 更新购物车中商品数量
    updateCount: function(updateNum) {
      var nCount = parseInt(Cookies.get('cartCount')) + updateNum;
      $('#sc-btn').find('.badge').text(nCount);
      Cookies.set('cartCount',nCount);
    },
    // 向购物车中添加商品
    add: function(pid_p,tit_p,subtit_p) {
      var oData = {
        pid:pid_p,
        num:tit_p,
        title:subtit_p
      };
      mApi.addToCart(pid_p)
      .done(function(success) {
        oShoppingCart.updateCount(1);
        $('#sc-list').prepend(tplMiniListItem(oData));
      })
      .fail(function(error) {
        alert(error);
      });
    },
    // 从购物车中删除商品
    remove: function(pid_p) {

      $('#sc-list').find('#miniCart-id-'+pid_p).hide();
      mApi.removeToCart(pid_p)
      .done(function(success) {
        $('#sc-list').find('#miniCart-id-'+pid_p).remove();
        oShoppingCart.updateCount(-1);
      })
      .fail(function(error) {
        $('#sc-list').find('#miniCart-id-'+pid_p).show();
        alert('删除失败');
      });
    },
    // 查看迷你购物车商品列表
    miniCart: function(fn_p) {
      // 获取mini购物车列表
      mApi.getMiniCart()
      .done(function(success) {
        document.getElementById('shopping').innerHTML = tplMiniList(success.data);
        Cookies.set('cartCount',success.data.count);
        $('#sc-list').delegate('a', 'click', function(event) {
          var jqSelf = $(this);
          oShoppingCart.remove(jqSelf.data('pid'));
        });
        if ($.isFunction(fn_p)) {
          fn_p();
        }
      })
      .fail(function(error) {
        alert('服务器请求错误');
      });
    },
    // 查看购物车商品列表
    cart: function() {
      mApi.getCart()
      .done(function(success) {
        // body...
      })
      .fail(function(error) {
        // body...
      });
    }
  };
  return oShoppingCart;
});
