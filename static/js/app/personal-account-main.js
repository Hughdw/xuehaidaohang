define(function (require) {
  var mCom = require('mod/common');
  var $ = require('jquery'),
      mButton = require('mod/button');
  $(function() {
    // 是否已经设置
    var oSetDone = {
      'avatar':null,
      'nickname':null,
      'password':null,
      'mobile':true,
      'email':false
    };
    // 网站头像相关事件
    mButton('#collapse-link-avatar','#collapse-avatar',oSetDone.avatar);
    mButton('#collapse-link-nickname','#collapse-nickname',oSetDone.nickname);
    mButton('#collapse-link-password','#collapse-password',oSetDone.password);
    mButton('#collapse-link-mobile','#collapse-mobile',oSetDone.mobile);
    mButton('#collapse-link-email','#collapse-email',oSetDone.email);


  });
});
