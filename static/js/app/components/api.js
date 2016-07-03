define(function(require) {
  var $ = require('jquery');
  var oUrl = {};
  var sHost = 'http://139.196.173.103:8081/api';
  var testPostfix = '';
  oUrl.getAuthUser = sHost + '/getAuthUser' + testPostfix;
  oUrl.getcategory = sHost + '/getcategory' + testPostfix;
  oUrl.getknowledge = sHost + '/getknowledge' + testPostfix;
  oUrl.getproductlist = sHost + '/getproductlist' + testPostfix;
  oUrl.getproduct = sHost + '/getproduct' + testPostfix;
  oUrl.getAvatarList = sHost + '/getAvatarList' + testPostfix;
  oUrl.updateAvatar = sHost + '/updateAvatar' + testPostfix;
  oUrl.updateNickName = sHost + '/updateNickName' + testPostfix;
  oUrl.updatePassword = sHost + '/updatePassword' + testPostfix;
  oUrl.verfiyOldAccount = sHost + '/verfiyOldAccount' + testPostfix;
  oUrl.updateAccount = sHost + '/updateAccount' + testPostfix;
  // 发送手机验证码
  oUrl.mobileCode = sHost + '/sendMobileCode' + testPostfix;
  // 发送邮箱验证码
  oUrl.mailCode = sHost + '/sendMailCode' + testPostfix;
  // 验证验证码
  oUrl.verifyCode = sHost + '/verifyCode' + testPostfix;
  // 判断账号是否存在
  oUrl.checkUsername = sHost + '/isUserReg' + testPostfix;
  oUrl.testUrl = sHost + '/isUserReg' + testPostfix;


  var api = {};
  var fnPretreatment = function(answer,deferred) {
    // 对后台返回的状态码做预处理
    if (answer.code == 200) {
      answer.status = true;
      // 200返回到成功回调函数中seccess
      deferred.resolve(answer);
    } else if (answer.code > 200) {
      answer.status = false;
      // 401返回到失败回调函数中error
      deferred.reject(answer);
    }
  };

  // 获取用户信息
  api.getAuthUser = function(token) {
    var oDeferred = $.Deferred();
    // $.get(oUrl.testUrl,{email:'whd007@163.com'})
    // .done(function(answer) {
    //   fnPretreatment(answer,oDeferred);
    // })
    // .fail(function(error) {
    //   oDeferred.reject(error);
    // });
    $.get(oUrl.getAuthUser,{token:token})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取视频目录
  api.getcategory = function() {
    var oDeferred = $.Deferred();
    $.get(oUrl.getcategory)
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取知识点
  api.getknowledge = function(id) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getknowledge,{id:id})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取视频列表
  api.getproductlist = function(level,grade,subjects,version,knowledge,page) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getproductlist,{level:level,grade:grade,subjects:subjects,version:version,knowledge:knowledge,page:page})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取视频详情
  api.getproduct = function(pid) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getproduct,{pid:pid})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取头像列表
  api.getAvatarList = function(token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getAvatarList,{token:token})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 更新头像
  api.updateAvatar = function(token,url) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updateAvatar,{token:token,avatar:url})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 修改昵称
  api.updateNickName = function(token,name) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updateNickName,{token:token,name:name})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 修改密码
  api.updatePassword = function(token,oldpd,newpd,repd) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updatePassword,{token:token,oldpassword:oldpd,newpassword:newpd,repassword:repd})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 验证老账号
  api.verfiyOldAccount = function(token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.verfiyOldAccount,{token:token})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 更新新邮箱
  api.updateEmail = function(token,email) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updateAccount,{token:token,newemail:email})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 更新新手机
  api.updateMobile = function(token,mobile) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updateAccount,{token:token,newmobile:mobile})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取短信验证码
  api.getMobileCode = function(type,mobile) {
    var oDeferred = $.Deferred();
    $.get(oUrl.mobileCode,{reg:type,mobile:mobile})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取邮件验证码
  api.getMailCode = function(type,mail) {
    var oDeferred = $.Deferred();
    $.get(oUrl.mailCode,{reg:type,email:mail})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 校验验证码
  api.verifyCode = function(type,codu) {
    var oParams;
    switch (type) {
      case 'mobile':
        oParams = {activationMobileCode:code};
        break;
      case 'mail':
        oParams = {activationMailCode:code};
        break;
      case 'img':
        oParams = {captcha:code};
        break;
      default:
        oParams = {};
    }
    var oDeferred = $.Deferred();
    $.get(oUrl.verifyCode,oParams)
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取邮件验证码
  api.checkUsername = function(type,username) {
    var oParams;
    if (type === 'mobile') {
      oParams = {mobile:username};
    } else if (type === 'email') {
      oParams = {email:username};
    }
    var oDeferred = $.Deferred();
    $.get(oUrl.checkUsername,oParams)
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };

  return api;
});
