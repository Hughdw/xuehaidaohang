define(function (require) {
  var tpldata = require('./data/template'),
      tplAccountMain = require('tpl/personal/account-main'),
      replaceImgPath = require('./components/replace-img-path'),
      mButton = require('./components/personal/button');
  $(function() {
    // console.log(mCommon.height.navbar);
    // 用户是否已经设置或绑定了对应资料
    var oSetDone = {
      'avatar':null,
      'nickname':null,
      'password':null,
      'mobile':true,
      'email':false
    };
    tpldata.sidebar.activeMenu = 0;//设置激活导航
    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中（#main）
    document.getElementById('main').innerHTML = tplAccountMain(tpldata);
    // document.getElementById('main').innerHTML = template('personal/account-main',tpldata);
    replaceImgPath();


    // 折叠版块事件绑定
    // 头像
    mButton.bindEvent('#collapse-link-avatar','#collapse-avatar',oSetDone.avatar);
    // 昵称
    mButton.bindEvent('#collapse-link-nickname','#collapse-nickname',oSetDone.nickname);
    // 登录密码
    mButton.bindEvent('#collapse-link-password','#collapse-password',oSetDone.password);
    // 绑定手机
    mButton.bindEvent('#collapse-link-mobile','#collapse-mobile',oSetDone.mobile);
    // 绑定邮箱
    mButton.bindEvent('#collapse-link-email','#collapse-email',oSetDone.email);


  });
});
