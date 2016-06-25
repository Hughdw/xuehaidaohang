/**
 * define函数用来定义模块
 * 1.加载模块
 * 2.code课程列表 的程序逻辑
 */
define(function (require) {
  var $ = require('jquery'),
      mApi = require('./components/api'),
      mGlobal = require('./components/global'),
      ResetMenu = require('./components/reset-menu'),
      mBindDropdown = require('./components/dropdown'),
      tpldata = require('./data/template'),
      tplListMenu = require('tpl/course/list-menu');
  // 页面载入
  $(function() {
    // 获取视频目录列表
    mApi.getcategory()
    .done(function(success) {
      var data = success.data;
      console.log(success);
      var gradeArr = [];
      for (var i = 0; i < data.length; i++) {
        if (data[0].parentid === '0') {
          gradeArr.push(data[0].name);
        }
        // data[i]
      }
      document.getElementById('gps-menu-collapse').innerHTML = tplListMenu(success);


          // 实例化 重置筛选列表尺寸 的对象
          var oResetMenu = new ResetMenu('tab-content');
          // 默认重置 筛选列表 的高度
          oResetMenu.render();
          // 窗口重置时，重新渲染
          var iTimer = 0;
          $(window).resize(function() {
            if (mGlobal.isPC) {
              clearTimeout(iTimer);
              iTimer = setTimeout(function() {
                oResetMenu.render();
              },500);
            }else {
              oResetMenu.render();
            }
          });
          // 点击按钮时，重新渲染
          $('#tab-content').on('click', '.menu-filter-bt', function() {
            // 重置 筛选列表 的高度
            oResetMenu.render();
            // $(this).toggleClass('click');
          });
          // 切换TAB时，重新渲染
          $('#menu-tabs').on('click', '.menu-tab', function(event) {
            $(this).tab('show');
            // 重置 筛选列表 的高度
            oResetMenu.render();
          });

          // 购物车下拉事件
          mBindDropdown.init('#sc-btn','.shopping-car',true);

          // 绑定目录-年级按钮
          $('#grade-tabs').on('click', '.grade-bt', function(event) {
            event.preventDefault();
            /* Act on the event */
            $(this).tab('show');
          });



    })
    .fail(function(error) {
      // alert(error);
    });




  });
});
