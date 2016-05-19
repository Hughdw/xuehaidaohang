define(function (require) {
  var $ = require('jquery'),
      tpldata = require('tpldata'),
      render = require('tpl/personal/preferential-main'),
      replaceImgPath = require('mod/replace-img-path');
  $(function() {
    tpldata.sidebar.activeMenu = 4;//设置激活导航
    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中（#main）
    document.getElementById('main').innerHTML = render(tpldata);
    // document.getElementById('main').innerHTML = template('personal/preferential-main',tpldata);
    replaceImgPath();

  });
});