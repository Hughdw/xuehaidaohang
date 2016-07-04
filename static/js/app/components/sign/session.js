// 负责将token，用户信息等存入cookies中
define(function(require) {
  var Cookies = require('jq-cookie'),
      mApi = require('components/api');
  var oSession = {};
  oSession.user = {
    token:'',
    nickname:'',//用户名
    balance:'',
    bindEmail:'',//绑定邮箱
    bindMobile:'',//绑定手机
    fail_time:'',//过期时间，暂时用不上
  };
  // 获取cookies中的token
  oSession.user.token = Cookies.get('token');
  // 登陆时，将需要的信息保存到cookies中（token 和 nickname）
  oSession.updateUserInfo = function(name,balance,bindEmail,bindMobile) {
    // Cookies.set('nickname',name);
    // Cookies.set('balance',balance);
    // Cookies.set('bindEmail',bindEmail);
    // Cookies.set('bindMobile',bindMobile);
    // oSession.user.nickname = name;
    // oSession.user.balance = balance;
    // oSession.user.bindEmail = bindEmail;
    // oSession.user.bindMobile = bindMobile;
  };
  oSession.createUser = function(token) {
    // 保存token到cookie中
    Cookies.set('token',token);
    oSession.user.token = token;
    // 获取用户信息
    // mApi.getAuthUser(token)
    // .done(function(success) {
    //   var nickname = success.data[0].user.nickname,
    //       balance = success.data[0].user.total,
    //       bindEmail = !!success.data[0].user.email,
    //       bindMobile = !!success.data[0].user.mobile;
    //
    //   //保存昵称到cookies中
    //   oSession.updateUserInfo(nickname,balance,bindEmail,bindMobile);
    //
    // })
    // .fail(function(error) {
    //   alert(error);
    // });
  };
  // 退出时，删除cookie
  oSession.destroyUser = function() {
    // 从cookies中删除token
    Cookies.remove('token');
    Cookies.remove('nickname');
    oSession.user.token = Cookies.get('token');
    oSession.user.nickname = Cookies.get('nickname');
  };
  return oSession;
});
