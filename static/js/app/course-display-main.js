/**
 * 1.加载模块
 * 2.课程详情 的程序逻辑
 */
define(function (require) {
  var mUtil = require('components/util'),
      mAuth = require('components/sign/auth'),
      mSession = require('components/sign/session'),
      mApi = require('components/api'),
      mBindDropdown = require('components/dropdown'),
      mVideoPlay = require('components/course/video-play'),
      tplTitle = require('tpl/course/display-title'),
      tplSidebar = require('tpl/course/display-sidebar');
  $(function() {
    var uid;
    // 向auth模块中加入视频的登录和登出方法。
    var oVideoSign = {};
    oVideoSign.login = function() {
      oLoadVideo.logined(uid,mSession.user.token);
    };
    oVideoSign.logout = function() {
      $('#firstBt').off().hide();
      oLoadVideo.notLogin();
    };
    mAuth.addNoticeList(oVideoSign);

    // 渲染模板和绑定事件
    function fnLoadAndBind (data) {
      // 渲染标题的模板
      document.getElementById('title').innerHTML = tplTitle(data);
      // 渲染侧栏的模板
      document.getElementById('tab-content').innerHTML = tplSidebar(data);
      // 标题下拉事件
      mBindDropdown.init('#tm-btn','.tit-master');
      // 购物车下拉事件
      mBindDropdown.init('#sc-btn','.shopping-car',true);
    }
    // 加载视频信息
    var oLoadVideo = {
      // 已登录加载视频详情
      logined:function(nUid_p,token_p) {
        // 获取视频详情
        mApi.getproduct(nPid,nUid_p)
        .done(function(success) {
          fnLoadAndBind(success.data[0]);
          // 初始化播放器
          mVideoPlay.init('play-box',success.data[0],token_p);
        })
        .fail(function(error) {
          console.log(error);
        });
      },
      // 未登录加载视频详情
      notLogin:function() {
        // 获取视频详情
        mApi.getproduct(nPid)
        .done(function(success) {
          fnLoadAndBind(success.data[0]);
          // 初始化播放器
          mVideoPlay.init('play-box',success.data[0]);
        })
        .fail(function(error) {
          console.log(error);
        });
      }
    };
    // 获取视频PID
    var nPid = mUtil.getQueryString('pid');
    if (mAuth.isAuthenticated()) {
      var token = mSession.user.token;
      // 获取用户信息
      mApi.getAuthUser(token)
      .done(function(success) {
        uid = success.data[0].user.id;
        oLoadVideo.logined(uid,token);
      })
      .fail(function(error) {
        // token过期自动登出
        mAuth.logout();
      });
    } else {
      oLoadVideo.notLogin();
    }

    // 绑定 TAG切换事件。
    $('#sidebar-tabs').on('click', '.sidebar-tab', function(event) {
      $(this).tab('show');
    });
    // document.getElementById('play-box').innerHTML = tplVideoPlay();

  });
});
