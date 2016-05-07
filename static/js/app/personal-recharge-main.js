define(function (require) {
  var $ = require('jquery'),
      tpldata = require('tpldata'),
      // handlebars = require('handlebars'),
      replaceImgPath = require('mod/replace-img-path');
  $(function() {

    tpldata.sidebar.activeMenu = 2;//设置激活导航
    document.getElementById('sidebar').innerHTML = template('personal/sidebar',tpldata.sidebar);

    replaceImgPath();
  });
});
