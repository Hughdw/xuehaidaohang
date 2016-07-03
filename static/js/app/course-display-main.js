/**
 * 1.加载模块
 * 2.课程详情 的程序逻辑
 */
define(function (require) {
  var mUtil = require('./components/util'),
      mApi = require('./components/api'),
      mBindDropdown = require('./components/dropdown'),
      mVideoPlay = require('./components/course/video-play'),
      tplTitle = require('tpl/course/display-title'),
      tplSidebar = require('tpl/course/display-sidebar');
  $(function() {
    // 获取视频PID
    var pid = mUtil.getQueryString('pid');
    // 获取视频详情
    mApi.getproduct(pid)
    .done(function(success) {
      // 渲染标题的模板
      document.getElementById('title').innerHTML = tplTitle(success.data);
      // 渲染侧栏的模板
      document.getElementById('tab-content').innerHTML = tplSidebar(success);
      // 标题下拉事件
      mBindDropdown.init('#tm-btn','.tit-master');
      // 购物车下拉事件
      mBindDropdown.init('#sc-btn','.shopping-car',true);
    })
    .fail(function(error) {
      console.log(error);
    });
    // 绑定 TAG切换事件。
    $('#sidebar-tabs').on('click', '.sidebar-tab', function(event) {
      $(this).tab('show');
    });


    // 初始化播放器
    // mVideoPlay.init('play-box','14651978969260019844');
    // document.getElementById('play-box').innerHTML = tplVideoPlay();

  });
});
