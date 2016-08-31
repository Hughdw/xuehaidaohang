define(function (require) {
  var $ = require('jquery'),
      tpldata = require('data/template'),
      tplProgressMain = require('tpl/personal/progress-main'),
      replaceImgPath = require('components/replace-img-path');
  $(function() {
    tpldata.sidebar.activeMenu = 1;//设置激活导航
    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中（#main）
    document.getElementById('main').innerHTML = tplProgressMain(tpldata);
    // document.getElementById('main').innerHTML = template('personal/progress-main',tpldata);
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
