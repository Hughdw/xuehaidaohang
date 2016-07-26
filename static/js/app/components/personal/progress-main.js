define(function(require) {
  var mApi = require('components/api'),
      mData = require('components/personal/data'),
      mAlert = require('components/alert'),
      tplProgressMain = require('tpl/personal/progress-main');

  var oProgress = {};

  // 加载内容
  oProgress.loadContent = function(userData,token_p) {
    // 获取学习进度信息
    mApi.getHistory(1,token_p)
    .done(function(success) {
      // 重新组织 学习进度 的数据
      console.log(success);
      var progressData = mData.regroupProgress(success.data,userData);
      document.getElementById('mainbar').innerHTML = tplProgressMain(progressData);
      // oProgress._bind(progressData,token_p);
      // replaceImgPath();
    })
    .fail(function(error) {

    });
  };
  // 绑定事件
  oProgress._bind = function(setDone,token_p) {

  };



  return oProgress;
});
