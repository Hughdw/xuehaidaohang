define(function (require) {
  var $ = require('jquery'),
      tpldata = require('tpldata'),
      // handlebars = require('handlebars'),
      replaceImgPath = require('mod/replace-img-path');
  $(function() {
    // template.helper('loadRecord',function(content) {
    //
    // })
    tpldata.sidebar.activeMenu = 2;//设置激活导航
    document.getElementById('main').innerHTML = template('personal/recharge-main',tpldata);

    replaceImgPath();







  });
});
