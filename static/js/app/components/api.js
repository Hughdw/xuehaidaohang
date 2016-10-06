define(function(require) {
  var $ = require('jquery');
  var oUrl = {};
  var sHost = 'http://139.196.173.103:8081/api';
  var testPostfix = '';
  // ************************************
  // 验证/验证码
  // ************************************
  // 图片验证码
  oUrl.imgCaptcha = sHost + '/getCaptcha';
  // 发送手机验证码
  oUrl.mobileCode = sHost + '/sendMobileCode' + testPostfix;
  // 发送邮箱验证码
  oUrl.mailCode = sHost + '/sendMailCode' + testPostfix;
  // 验证验证码
  oUrl.verifyCode = sHost + '/verifyCode' + testPostfix;
  // 判断账号是否存在
  oUrl.checkAccount = sHost + '/isUserReg' + testPostfix;
  // ************************************
  // 课程列表/详情/搜索
  // ************************************
  // 获取视频目录
  oUrl.getcategory = sHost + '/getcategory' + testPostfix;
  // 获取知识点
  oUrl.getknowledge = sHost + '/getknowledge' + testPostfix;
  // 获取视频列表
  oUrl.getproductlist = sHost + '/getproductlist' + testPostfix;
  // 获取视频详情
  oUrl.getproduct = sHost + '/getproduct' + testPostfix;
  // 获取搜索结果
  oUrl.getSearch = sHost + '/getsearch' + testPostfix;
  // ************************************
  // 用户中心
  // ************************************
  oUrl.getAuthUser = sHost + '/getAuthUser' + testPostfix;
  oUrl.getAvatarList = sHost + '/getAvatarList' + testPostfix;
  oUrl.updateAvatar = sHost + '/updateAvatar' + testPostfix;
  oUrl.updateNickName = sHost + '/updateNickName' + testPostfix;
  // 修改密码
  oUrl.updatePassword = sHost + '/updatePassword' + testPostfix;
  oUrl.verifyOldAccount = sHost + '/verifyOldAccount' + testPostfix;
  oUrl.updateAccount = sHost + '/updateAccount' + testPostfix;
  // 更新学习进度
  oUrl.updateHistory = sHost + '/updateHistory' + testPostfix;
  // 学习进度列表
  oUrl.getHistory = sHost + '/getHistory' + testPostfix;
  // 兑换优惠券
  oUrl.getCoupon = sHost + '/exchange' + testPostfix;
  // 获取优惠券列表
  oUrl.getCouponList = sHost + '/getCouponList' + testPostfix;
  // ************************************
  // 购物车
  // ************************************
  // 获取购物车当中的产品
  oUrl.getCart = sHost + '/getcart' + testPostfix;
  // 获取购物车当中的产品（简洁数据）
  oUrl.getMiniCart = sHost + '/getminicart' + testPostfix;
  // 添加产品到购物车
  oUrl.addToCart = sHost + '/addtocart' + testPostfix;
  // 移除购物车当中的产品
  oUrl.removeToCart = sHost + '/removetocart' + testPostfix;
  // ************************************
  // 支付相关
  // ************************************
  // 获取支付方式
  oUrl.getPay = sHost + '/getPay' + testPostfix;
  // 生成订单
  oUrl.payMent = sHost + '/payment' + testPostfix;
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
      // deferred.resolve(answer);
      deferred.reject(answer);
    }
  };

  // ************************************
  // 登录/注册/验证
  // ************************************
  // 获取图片验证码
  api.getImgCaptcha = function() {
    return oUrl.imgCaptcha + '?v=' + Math.random();
  };
  // 获取短信验证码
  // 注册：type = 1 其他：type = 0
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
  api.getEmailCode = function(type,mail) {
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
  api.verifyCode = function(type,code,account,accountType) {
    var oParams;
    switch (type) {
      case 'mobile':
        if (accountType === 'mobile') {
          oParams = {activationMobileCode:code,mobile:account};
        } else if (accountType === 'email') {
          oParams = {activationMobileCode:code,email:account};
        }
        break;
      case 'email':
        if (accountType === 'mobile') {
          oParams = {activationMailCode:code,mobile:account};
        } else if (accountType === 'email') {
          oParams = {activationMailCode:code,email:account};
        }
        break;
      case 'img':
        if (accountType === 'mobile') {
          oParams = {captcha:code,mobile:account};
        } else if (accountType === 'email') {
          oParams = {captcha:code,email:account};
        }
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
  // 判断账号是否存在
  api.checkAccount = function(type,account) {
    var oParams;
    if (type === 'mobile') {
      oParams = {mobile:account};
    } else if (type === 'email') {
      oParams = {email:account};
    }
    var oDeferred = $.Deferred();
    $.get(oUrl.checkAccount,oParams)
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // ************************************
  // 课程列表/详情/搜索
  // ************************************
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
  api.getproduct = function(pid,uid) {
    var oParams;
    if (uid) {
      oParams = {pid:pid,uid:uid};
    } else {
      oParams = {pid:pid};
    }
    var oDeferred = $.Deferred();
    $.get(oUrl.getproduct,oParams)
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  api.getSearch = function(q,page) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getSearch,{q:q,page:page})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // ************************************
  // 用户中心
  // ************************************
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
  api.verifyOldAccount = function(token,account,type) {
    var oParams;
    if (type === 'mobile') {
      oParams = {token:token,mobile:account};
    } else if (type === 'email') {
      oParams = {token:token,email:account};
    }
    var oDeferred = $.Deferred();
    $.get(oUrl.verifyOldAccount,oParams)
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 更新新邮箱/设置邮箱
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
  // 更新新手机/设置手机
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
  // 更新学习进度（保存播放位置，未完）
  api.updateHistory = function(pid,begin,lasttime,token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updateHistory,{pid:pid,begin:begin,lasttime:lasttime,token:token})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取学习进度列表
  api.getHistory = function(page,token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getHistory,{page:page,token:token})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取优惠券
  api.getCoupon = function(code,token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getCoupon,{code:code,token:token})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取优惠券列表
  api.getCouponList = function(page,token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getCouponList,{page:page,token:token})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // ************************************
  // 购物车
  // ************************************
  // 获取购物车中的产品
  api.getCart = function() {
    var oDeferred = $.Deferred();
    $.get(oUrl.getCart)
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取购物车中的产品（简洁数据）
  api.getMiniCart = function() {
    var oDeferred = $.Deferred();
    $.get(oUrl.getMiniCart)
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 添加产品到购物车
  api.addToCart = function(pid) {
    var oDeferred = $.Deferred();
    $.get(oUrl.addToCart,{pid:pid})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 移除产品到购物车
  api.removeToCart = function(pid) {
    var oDeferred = $.Deferred();
    $.get(oUrl.removeToCart,{pid:pid})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // ************************************
  // 支付相关
  // ************************************
  // 获取支付方式
  api.getPay = function() {
    var oDeferred = $.Deferred();
    $.get(oUrl.getPay)
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 生成订单
  api.payMent = function(couponid,pay,total) {
    var oDeferred = $.Deferred();
    $.get(oUrl.payMent,{pid:pid})
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
