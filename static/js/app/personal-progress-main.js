define(function (require) {
  var $ = require('jquery'),
      tpldata = require('tpldata'),
      replaceImgPath = require('mod/replace-img-path');
  $(function() {
    tpldata.sidebar.activeMenu = 1;//设置激活导航
    // 插入绑定好数据的模版
    document.getElementById('sidebar').innerHTML = template('personal/sidebar',tpldata.sidebar);
    replaceImgPath();
    // 开始时间  02:30
    // 视频总时间  10:20
    // 观看的时长  5:00
    var progress = {
      'starTimestamp':'1462415405',
      'star':'',
      'timeSpan':new Date(),
      'totalTime':''
    };

  });
});
