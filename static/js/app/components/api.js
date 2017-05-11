/**
 * @title API模块
 * @fileOverView 本文件用于向后台API请求，获得回应。文件中的API包含 课程/用户中心/购物车/支付相关。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');

  var oUrl = {};
  var sHost = 'http://139.196.173.103:8081/api';
  var sTestPostfix = '';
 // ************************************
  // 验证/验证码
 // ************************************
  // 图片验证码
  oUrl.imgCaptcha = sHost + '/getCaptcha';
  // 发送手机验证码
  oUrl.mobileCode = sHost + '/sendMobileCode' + sTestPostfix;
  // 发送邮箱验证码
  oUrl.mailCode = sHost + '/sendMailCode' + sTestPostfix;
  // 验证验证码
  oUrl.verifyCode = sHost + '/verifyCode' + sTestPostfix;
  // 判断账号是否存在
  oUrl.checkAccount = sHost + '/isUserReg' + sTestPostfix;
 // ************************************
  // 课程列表/详情/搜索
 // ************************************
  // 获取视频目录
  oUrl.getCategory = sHost + '/getcategory' + sTestPostfix;
  // 获取知识点
  oUrl.getKnowledge = sHost + '/getknowledge' + sTestPostfix;
  // 获取视频列表
  oUrl.getProductList = sHost + '/getproductlist' + sTestPostfix;
  // 获取视频详情
  oUrl.getProductDetails = sHost + '/getproduct' + sTestPostfix;
  // 获取搜索结果
  oUrl.getSearch = sHost + '/getsearch' + sTestPostfix;
 // ************************************
  // 用户中心
 // ************************************
  oUrl.getAuthUser = sHost + '/getAuthUser' + sTestPostfix;
  oUrl.getAvatarList = sHost + '/getAvatarList' + sTestPostfix;
  oUrl.updateAvatar = sHost + '/updateAvatar' + sTestPostfix;
  oUrl.updateNickName = sHost + '/updateNickName' + sTestPostfix;
  // 修改密码
  oUrl.updatePassword = sHost + '/updatePassword' + sTestPostfix;
  oUrl.verifyOldAccount = sHost + '/verifyOldAccount' + sTestPostfix;
  oUrl.updateAccount = sHost + '/updateAccount' + sTestPostfix;
  // 更新学习进度
  oUrl.updateHistory = sHost + '/updateHistory' + sTestPostfix;
  // 学习进度列表
  oUrl.getHistory = sHost + '/getHistory' + sTestPostfix;
  // 兑换优惠券
  oUrl.getCoupon = sHost + '/exchange' + sTestPostfix;
  // 获取优惠券列表
  oUrl.getCouponList = sHost + '/getCouponList' + sTestPostfix;
 // ************************************
  // 购物车
 // ************************************
  // 获取购物车当中的产品
  oUrl.getCart = sHost + '/getcart' + sTestPostfix;
  // 获取购物车当中的产品（简洁数据）
  oUrl.getMiniCart = sHost + '/getminicart' + sTestPostfix;
  // 添加产品到购物车
  oUrl.addToCart = sHost + '/addtocart' + sTestPostfix;
  // 移除购物车当中的产品
  oUrl.removeToCart = sHost + '/removetocart' + sTestPostfix;
 // ************************************
  // 支付相关
 // ************************************
  // 获取支付方式
  oUrl.getPay = sHost + '/getPay' + sTestPostfix;
  // 生成订单
  oUrl.payMent = sHost + '/payment' + sTestPostfix;
  oUrl.testUrl = sHost + '/isUserReg' + sTestPostfix;

  var oApi = {};
  // 对后台返回的状态码做预处理
  function pretreatment (answer, deferred) {
    if (answer.code === 200) {
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
  oApi.getImgCaptcha = function () {
    return oUrl.imgCaptcha + '?v=' + Math.random();
  };
  // 获取短信验证码
  // 注册：type = 1 其他：type = 0
  oApi.getMobileCode = function (type, mobile) {
    var oDeferred = $.Deferred();
    $.get(oUrl.mobileCode, {reg: type, mobile: mobile})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取邮件验证码
  oApi.getEmailCode = function (type, mail) {
    var oDeferred = $.Deferred();
    $.get(oUrl.mailCode, {reg: type, email: mail})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 校验验证码
  oApi.verifyCode = function (type, code, account, accountType) {
    var oParams;
    switch (type) {
      case 'mobile':
        if (accountType === 'mobile') {
          oParams = {activationMobileCode: code, mobile: account};
        } else if (accountType === 'email') {
          oParams = {activationMobileCode: code, email: account};
        }
        break;
      case 'email':
        if (accountType === 'mobile') {
          oParams = {activationMailCode: code, mobile: account};
        } else if (accountType === 'email') {
          oParams = {activationMailCode: code, email: account};
        }
        break;
      case 'img':
        if (accountType === 'mobile') {
          oParams = {captcha: code, mobile: account};
        } else if (accountType === 'email') {
          oParams = {captcha: code, email: account};
        }
        break;
      default:
        oParams = {};
    }
    var oDeferred = $.Deferred();
    $.get(oUrl.verifyCode, oParams)
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 判断账号是否存在
  oApi.checkAccount = function (type, account) {
    var oParams;
    if (type === 'mobile') {
      oParams = {mobile: account};
    } else if (type === 'email') {
      oParams = {email: account};
    }
    var oDeferred = $.Deferred();
    $.get(oUrl.checkAccount, oParams)
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
 // ************************************
  // 课程列表/详情/搜索
 // ************************************
  // 获取视频目录
  oApi.getCategory = function () {
    var oDeferred = $.Deferred();
    $.get(oUrl.getCategory)
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取知识点
  oApi.getKnowledge = function (id) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getKnowledge, {id: id})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取视频列表
  oApi.getProductList = function (level, grade, subjects, version, knowledge, page) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getProductList, {level: level, grade: grade, subjects: subjects, version: version, knowledge: knowledge, page: page})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取视频详情
  oApi.getProductDetails = function (pid, uid) {
    var oParams;
    if (uid) {
      oParams = {pid: pid, uid: uid};
    } else {
      oParams = {pid: pid};
    }
    var oDeferred = $.Deferred();
    $.get(oUrl.getProductDetails, oParams)
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  oApi.getSearch = function (q, page) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getSearch, {q: q, page: page})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
 // ************************************
  // 用户中心
 // ************************************
  // 获取用户信息
  oApi.getAuthUser = function (token) {
    var oDeferred = $.Deferred();
    // $.get(oUrl.testUrl,{email:'whd007@163.com'})
    // .done(function(answer) {
    //   fnPretreatment(answer,oDeferred);
    // })
    // .fail(function(error) {
    //   oDeferred.reject(error);
    // });
    $.get(oUrl.getAuthUser, {token: token})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取头像列表
  oApi.getAvatarList = function (token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getAvatarList, {token: token})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 更新头像
  oApi.updateAvatar = function (token, url) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updateAvatar, {token: token, avatar: url})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 修改昵称
  oApi.updateNickName = function (token, name) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updateNickName, {token: token, name: name})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 修改密码
  oApi.updatePassword = function (token, oldpd, newpd, repd) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updatePassword, {token: token, oldpassword: oldpd, newpassword: newpd, repassword: repd})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 验证老账号
  oApi.verifyOldAccount = function (token, account, type) {
    var oParams;
    if (type === 'mobile') {
      oParams = {token: token, mobile: account};
    } else if (type === 'email') {
      oParams = {token: token, email: account};
    }
    var oDeferred = $.Deferred();
    $.get(oUrl.verifyOldAccount, oParams)
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 更新新邮箱/设置邮箱
  oApi.updateEmail = function (token, email) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updateAccount, {token: token, newemail: email})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 更新新手机/设置手机
  oApi.updateMobile = function (token, mobile) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updateAccount, {token: token, newmobile: mobile})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 更新学习进度（保存播放位置，未完）
  oApi.updateHistory = function (pid, begin, lasttime, token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.updateHistory, {pid: pid, begin: begin, lasttime: lasttime, token: token})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取学习进度列表
  oApi.getHistory = function (page, token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getHistory, {page: page, token: token})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取优惠券
  oApi.getCoupon = function (code, token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getCoupon, {code: code, token: token})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取优惠券列表
  oApi.getCouponList = function (page, token) {
    var oDeferred = $.Deferred();
    $.get(oUrl.getCouponList, {page: page, token: token})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
 // ************************************
  // 购物车
 // ************************************
  // 获取购物车中的产品
  oApi.getCart = function () {
    var oDeferred = $.Deferred();
    $.get(oUrl.getCart)
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取购物车中的产品（简洁数据）
  oApi.getMiniCart = function () {
    var oDeferred = $.Deferred();
    $.get(oUrl.getMiniCart)
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 添加产品到购物车
  oApi.addToCart = function (pid) {
    var oDeferred = $.Deferred();
    $.get(oUrl.addToCart, {pid: pid})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 移除产品到购物车
  oApi.removeToCart = function (pid) {
    var oDeferred = $.Deferred();
    $.get(oUrl.removeToCart, {pid: pid})
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
 // ************************************
  // 支付相关
 // ************************************
  // 获取支付方式
  oApi.getPay = function () {
    var oDeferred = $.Deferred();
    $.get(oUrl.getPay)
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 生成订单
  oApi.payMent = function (couponid, pay, total) {
    var oDeferred = $.Deferred();
    $.get(oUrl.payMent)
    .done(function (answer) {
      pretreatment(answer, oDeferred);
    })
    .fail(function (error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };

  return oApi;
});
