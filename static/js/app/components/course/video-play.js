define(function(require) {
  var mUtil = require('../util');

  var oVideo = {};
  // 播放器实例
  var player;
  // 播放器容器ID
  var jqEle;
  var nVideoWidth,nVideoHeight;
  oVideo.init = function(ele,videoId) {
    jqEle = $('#'+ele);
    // 重新获取尺寸
    oVideo._reset();
    // 绑定窗口重置事件
    oVideo._bindEve();
    // 构造播放器实例
    player = new qcVideo.Player(
      //页面放置播放位置的元素 ID
      ele, {
        //视频 ID (必选参数)
        'file_id': videoId,
        //应用 ID (必选参数)，同一个账户下的视频，该参数是相同的
        'app_id': '1252342399',
        //是否自动播放 默认值0 (0: 不自动，1: 自动播放)
        'auto_play': '0',
        //播放器宽度，单位像素
        'width': nVideoWidth,
        //播放器高度，单位像素
        'height': nVideoHeight,
        //屏蔽全屏播放标识,默认值0 (0: 支持全屏播放,1: 禁用全屏播放)
        'disable_full_screen': 0,
        //禁止拖动标识,默认值0 (0: 允许拖拽,1: 禁止拖拽)
        // 'disable_drag': 1,
        //如视频尺寸小于播放器尺寸，拉伸视频至播放器大小，默认值0 (0: 不拉伸,1: 拉伸全屏)
        // 'stretch_full': 1,
        //60秒后停止播放(试看功能) , 并且触发'playStatus'事件
        // 'stop_time': 10,
        'remember': 1, //1:记住上一次未看完的时间点,下次再播放，从该时间点开始播放
        //加速播放,譬如 2，表示2倍速度播放， 1/2表示慢正常速度一倍播放， 注意这个值暂时只对 h5播放生效;
        // 'playbackRate': 1,
        //隐藏 h5的设置按钮 ，默认不隐藏，true 为隐藏
        'hide_h5_setting': false,
        //开启防盗链后，可以通过配置下面的可访问的视频地址，支持播放器播放；清晰度类型通过 url 与后台查出的 url 前缀匹配得到
        //注意，下面所有的地址必须是上面对应的 file_id 的视频资源地址，否则不会生效
        // 'videos': [
        //   'http://xxx.myqcloud.com/xxxyy_f220.m3u8?sign=xxx'
        // ],
        //默认 window 不支持其他页面元素覆盖在上面，如需要可以修改为 opaque 或其他 flash Vmode 的参数值
        // 'WMode': 'window',
        //默认为 false ,设置为 true 支持将开始、暂停、结束时的图片贴片，铺满播放器
        // 'stretch_patch': false,
      }, {
        //全屏/退出全屏操作 ,isFullScreen: true全屏 ; false 退出全屏
        'fullScreen': function(isFullScreen) {
          //console.debug('out listener isFullScreen == ',isFullScreen);
        },
        //播放状态发生变化时的回调
        'playStatus': function(status) {
          /*status 可为 {ready: '播放器已准备就绪',seeking:'搜索',
          suspended:'暂停', playing:'播放中' , playEnd:'播放结束' , stop: '试看
          结束触发'}'*/
          //console.debug('out listener status == ',status);
          console.log(player.getCurrentTime());
        },
        //拖动播放位置变化 ； second 拖动播放的位置（单位秒）
        'dragPlay': function(second) {
          //console.debug('out listener dragPlay == ',second);
        }
      }
    );
  };
  oVideo._reset = function() {
    nVideoWidth = jqEle.width();
    nVideoHeight = jqEle.height();
  };
  oVideo._resizeVideo = function() {
    oVideo._reset();
    // 重置播放器的尺寸
    player.resize(nVideoWidth,nVideoHeight);
  };
  oVideo._bindEve = function() {
    var iTimer = 0;
    // 窗口发生变化时候，重置高度
    $(window).resize(function() {
      if (mUtil.isPC) {
        clearTimeout(iTimer);
        iTimer = setTimeout(function() {
          oVideo._resizeVideo();
        },500);
      }else {
        oVideo._resizeVideo();
      }
    });
  };
  return {
    init:oVideo.init,
    player:player
  };

  // // 获取当前视频总时长
  // player.getDuration();
  // // 获取当前播放位置
  // player.getCurrentTime();
  // // 播放结束
  // player.isPlayEnd();
});
