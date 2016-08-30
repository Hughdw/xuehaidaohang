define(function(require) {
  var mApi = require('components/api'),
      tplMiniList = require('tpl/shoppingcart/mini-list'),
      tplMiniListItem = require('tpl/shoppingcart/mini-list-item'),
      Cookies = require('jq-cookie');

  var aMiniCartCache;// 迷你购物车中的数据缓存
  var oShoppingOperation = {
    // 更新购物车 和 cookies 中的商品数量
    updateCount: function(updateNum) {
      var nCount = parseInt(Cookies.get('cartCount')) + updateNum;
      $('#sc-btn').find('.badge').text(nCount);
      Cookies.set('cartCount',nCount);
    },
    // 向购物车中添加商品
    add: function(pid_p,tit_p,subtit_p,qty_p) {
      var oData = {
        pid:pid_p,
        num:tit_p,
        title:subtit_p,
        qty:qty_p
      };
      oShoppingOperation.updateCount(1);
      mApi.addToCart(pid_p)
      .done(function(success) {
        // 查询当前添加的商品在购物车列表中是否存在。
        // 1.存在则增加数量。
        for (var i = 0; i < aMiniCartCache.length; i++) {
          if (aMiniCartCache[i].pid === pid_p) {
            // console.log('存在商品');
            // aMiniCartCache.push(oData);
            aMiniCartCache[i].qty += 1;
            $('#miniCart-id-'+pid_p).find('span.sc-qty b').text(aMiniCartCache[i].qty);
            oData = null;
          }
        }
        // 2.不存在则新增一条数据。
        if (oData !== null) {
          aMiniCartCache.push(oData);
          $('#sc-list').prepend(tplMiniListItem(oData));
        }
      })
      .fail(function(error) {
        alert('添加商品错误');
        oShoppingOperation.updateCount(-1);
      });
    },
    // 从购物车中删除商品
    remove: function(pid_p) {
      // 暂时隐藏HTML
      $('#sc-list').find('#miniCart-id-'+pid_p).hide();
      mApi.removeToCart(pid_p)
      .done(function(success) {
        // 删除HTML
        $('#sc-list').find('#miniCart-id-'+pid_p).remove();
        // 从总数中减去删除商品的数量
        //

        for (var i = 0; i < aMiniCartCache.length; i++) {
          if (aMiniCartCache[i].pid === pid_p) {
            oShoppingOperation.updateCount(-aMiniCartCache[i].qty);
            // 删除数据
            aMiniCartCache.splice(i,1);
          }
        }
        console.log(obj);
      })
      .fail(function(error) {
        // 删除失败，恢复显示
        $('#sc-list').find('#miniCart-id-'+pid_p).show();
        alert('删除失败');
      });
    },
    // 加载迷你购物车商品列表
    loadMiniCart: function(fn_p) {
      // 获取mini购物车列表
      mApi.getMiniCart()
      .done(function(success) {
        // 购物车的数据
        aMiniCartCache = success.data.miniCart;
        // 渲染数据
        document.getElementById('shopping').innerHTML = tplMiniList(success.data);
        // 保存cookies
        Cookies.set('cartCount',success.data.count);
        // 委派事件：删除购物车中的商品
        $('#sc-list').delegate('a', 'click', function(event) {
          var jqSelf = $(this);
          oShoppingOperation.remove(jqSelf.data('pid'));
        });
        // 执行传入的函数
        if ($.isFunction(fn_p)) {
          fn_p();
          // 测试数据
          // var testData = {
          //   pid:2,
          //   num:'第一课',
          //   title:'数列的概念与简单表示法',
          //   qty:2
          // };
          // $('#sc-list').prepend(tplMiniListItem(testData));
        }
      })
      .fail(function(error) {
        alert('购物车加载失败');
      });
    },
    // 查看购物车商品列表
    loadCart: function() {
      mApi.getCart()
      .done(function(success) {
        console.log(success);
      })
      .fail(function(error) {
        // body...
      });
    }
  };
  return oShoppingOperation;
});
