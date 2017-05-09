/**
 * @title 初始化播放器模块
 * @fileOverView 本文件用于播放器的初始化。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var qcVideo = require('qcVideo');
  var mUtil = require('components/util');
  var mApi = require('components/api');

 // ************************************
 // 声明
 // ************************************
  var oVideo = {};
  // 播放器实例
  var player;
 // ************************************
 // 内部方法
 // ************************************
  // 获取播放器的宽高
  oVideo._getSize = function (ele) {
    return {
      width: ele.width(),
      height: ele.height()
    };
  };
  // 重置播放器的尺寸
  oVideo._resizeVideo = function (ele) {
    var oEleSize = oVideo._getSize(ele);
    player.resize(oEleSize.width, oEleSize.height);
  };
  // 绑定窗口变化事件
  oVideo._bindEve = function (ele) {
    var nTimer = 0;
    // 窗口发生变化时候，重置高度
    $(window).resize(function () {
      if (mUtil.isPC) {
        clearTimeout(nTimer);
        nTimer = setTimeout(function () {
          oVideo._resizeVideo(ele);
        }, 500);
      } else {
        oVideo._resizeVideo(ele);
      }
    });
  };

 // ************************************
 // 对外暴露方法
 // ************************************
  oVideo.init = function (ele, data, token) {
    var jqEle = $('#' + ele);
    var oEleSize = oVideo._getSize(jqEle);
    // 绑定窗口重置事件
    oVideo._bindEve(jqEle);

    // 构造播放器实例
    player = new qcVideo.Player(
      // 页面放置播放位置的元素 ID
      ele, {
        // 视频 ID (必选参数)
        'file_id': data.video,
        // 应用 ID (必选参数)，同一个账户下的视频，该参数是相同的
        'app_id': '1252446141',
        // 是否自动播放 默认值0 (0: 不自动，1: 自动播放)
        'auto_play': '0',
        // 播放器宽度，单位像素
        'width': oEleSize.width,
        // 播放器高度，单位像素
        'height': oEleSize.height,
        // 屏蔽全屏播放标识,默认值0 (0: 支持全屏播放,1: 禁用全屏播放)
        'disable_full_screen': 0,
        // 禁止拖动标识,默认值0 (0: 允许拖拽,1: 禁止拖拽)
        // 'disable_drag': 1,
        // 如视频尺寸小于播放器尺寸，拉伸视频至播放器大小，默认值0 (0: 不拉伸,1: 拉伸全屏)
        // 'stretch_full': 1,
        // 60秒后停止播放(试看功能) , 并且触发'playStatus'事件
        // 'stop_time': 10,
        'remember': 1, // 1:记住上一次未看完的时间点,下次再播放，从该时间点开始播放
        // 加速播放,譬如 2，表示2倍速度播放， 1/2表示慢正常速度一倍播放， 注意这个值暂时只对 h5播放生效;
        // 'playbackRate': 1,
        // 隐藏 h5的设置按钮 ，默认不隐藏，true 为隐藏
        'hide_h5_setting': false
        // 开启防盗链后，可以通过配置下面的可访问的视频地址，支持播放器播放；清晰度类型通过 url 与后台查出的 url 前缀匹配得到
        // 注意，下面所有的地址必须是上面对应的 file_id 的视频资源地址，否则不会生效
        // 'videos': [
        //   'http://xxx.myqcloud.com/xxxyy_f220.m3u8?sign=xxx'
        // ],
        // 默认 window 不支持其他页面元素覆盖在上面，如需要可以修改为 opaque 或其他 flash Vmode 的参数值
        // 'WMode': 'window',
        // 默认为 false ,设置为 true 支持将开始、暂停、结束时的图片贴片，铺满播放器
        // 'stretch_patch': false,
      }, {
        // 全屏/退出全屏操作 ,isFullScreen: true全屏 ; false 退出全屏
        'fullScreen': function (isFullScreen) {
          // console.debug('out listener isFullScreen == ',isFullScreen);
        },
        // 播放状态发生变化时的回调
        'playStatus': function (status) {
          if (token) {
            // 准备状态 并且 不是第一次播放时，显示接着上一次播放按钮
            if (status === 'ready' && data.lasttime !== 0) {
              $('#firstBt').show().on('click', function (event) {
                event.preventDefault();
                player.play(data.lasttime);
                $(this).hide();
              });
            }
            // interval 方法的ID
            var vIntervalId;
            // 正在播放状态，请求更新接口
            if (status === 'playing') {
              $('#firstBt').hide();
              // 周期性请求 播放位置 更新接口
              vIntervalId = setInterval(function () {
                // console.log(data.lasttime);
                // console.log(player.getCurrentTime());
                var nTimestamp = Math.round(new Date().getTime() / 1000);
                mApi.updateHistory(data.pid, nTimestamp, player.getCurrentTime(), token)
                .done(function (success) {
                  console.log(success);
                })
                .fail(function (error) {
                  console.log(error);
                });
              }, 5000);
            }
            // 暂停、播放结束，清除周期性请求接口
            if (status === 'suspended' || status === 'playEnd') {
              clearInterval(vIntervalId);
            }
          }
          /* status 可为 {ready: '播放器已准备就绪',seeking:'搜索视频',
          suspended:'暂停', playing:'播放中' , playEnd:'播放结束' , stop: '试看
          结束触发'}' */
          // console.debug('out listener status == ',status);
        },
        // 拖动播放位置变化 ； second 拖动播放的位置（单位秒）
        'dragPlay': function (second) {
          // console.debug('out listener dragPlay == ',second);
        }
      }
    );
  };

  return oVideo.init;
  // // 获取当前视频总时长
  // player.getDuration();
  // // 获取当前播放位置
  // player.getCurrentTime();
  // // 播放结束
  // player.isPlayEnd();
});
