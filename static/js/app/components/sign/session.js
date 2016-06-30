// 负责将token，用户信息等存入cookies中
define(function(require) {
  var Cookies = require('jq-cookie'),
      mApi = require('../api');
  var oSession = {};
  oSession.user = {
    token:'',
    nickname:'',
    fail_time:'',//暂时用不上
  };
  // 获取cookies中的token
  oSession.user.token = Cookies.get('token');
  // 登陆时，将需要的信息保存到cookies中（token 和 nickname）
  oSession.createUser = function(token) {
    // 保存token到cookie中
    Cookies.set('token',token);
    oSession.user.token = token;

    mApi.getAuthUser(token)
    .done(function(success) {
      var nickname = success.data[0].user.nickname;
      //保存昵称到cookies中
      Cookies.set('nickname', nickname);
      oSession.user.nickname = nickname;
    })
    .fail(function(error) {
      alert(error);
    });
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
