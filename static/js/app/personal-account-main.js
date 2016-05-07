define(function (require) {
  var $ = require('jquery'),
      tpldata = require('tpldata'),
      replaceImgPath = require('mod/replace-img-path'),
      mButton = require('mod/button');
  $(function() {
    tpldata.sidebar.activeMenu = 0;//设置激活导航
    // 插入绑定好数据的模版
    document.getElementById('sidebar').innerHTML = template('personal/sidebar',tpldata.sidebar);
    replaceImgPath();
    // 用户是否已经设置或绑定了对应资料
    var oSetDone = {
      'avatar':null,
      'nickname':null,
      'password':null,
      'mobile':true,
      'email':false
    };

    // 网站头像相关事件
    mButton.bindEvent('#collapse-link-avatar','#collapse-avatar',oSetDone.avatar);
    mButton.bindEvent('#collapse-link-nickname','#collapse-nickname',oSetDone.nickname);
    mButton.bindEvent('#collapse-link-password','#collapse-password',oSetDone.password);
    mButton.bindEvent('#collapse-link-mobile','#collapse-mobile',oSetDone.mobile);
    mButton.bindEvent('#collapse-link-email','#collapse-email',oSetDone.email);


  });
});
