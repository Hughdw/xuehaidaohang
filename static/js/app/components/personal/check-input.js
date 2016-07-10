define(function(require) {
  var Validate = require('components/validate'),
      mApi = require('components/api');

  // 验证规则
  var oCheckFormat = {
    nicknameLength:function(str) {
      var aZhStr = str.match(/[\u4e00-\u9fa5]/g) || [];
      var aEnStr = str.match(/\w/g) || [];
      var nZhStrLen = aZhStr.length*2;
      var nEnStrLen = aEnStr.length;
      return (nZhStrLen + nEnStrLen) > 10 ? false : true;
    },
    password:function(str) {
      var reg = /^[^\s]{6,15}$/;
      return reg.test(str);
    },
    mobile:function(str) {
      var reg = /^(13|14|15|18|17)\d{9}$/;
      return reg.test(str);
    },
    email:function(str) {
      var reg = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+[-a-zA-Z0-9]*)+[a-zA-Z0-9]+$/;
      return reg.test(str);
    },
    imgCaptcha:function(str) {
      var reg = /^\w{5}$/;
      return reg.test(str);
    },
    mobileCaptcha:function(str) {
      var reg = /^\d{4}$/;
      return reg.test(str);
    },
    emailCaptcha:function(str) {
      var reg = /^\d{4}$/;
      return reg.test(str);
    },
  };
  var oCheckInput = {};
  // 输入的昵称超出长度限制，进行错误标识
  oCheckInput.nickname = function(validate,inputEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    if (!oCheckFormat.nicknameLength(inputEle.val())) {
      validate.setHintValue(index,'1');
      inputEle.addClass('invalid');
      $('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
      $('#button-nickname').attr('disabled','disabled');
    } else {
      validate.setHintValue(index,'R');
      inputEle.removeClass('invalid');
      $('.hint-info-'+index).hide().text('');
      $('#button-nickname').removeAttr('disabled');
    }
  };
  // 验证密码格式
  oCheckInput.password = function(validate,formEle,inputEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    if (!oCheckFormat.password(inputEle.val())) {
      validate.setHintValue(index,'1');
      inputEle.addClass('invalid');
      formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
    } else {
      validate.setHintValue(index,'R');
      inputEle.removeClass('invalid');
      $('.hint-info-'+index).text('').hide();
    }
  };
  // 验证与密码是否相同，相同显示错误提示
  oCheckInput.newPassword = function(validate,formEle,inputEle,contrastEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    if (inputEle.val() === contrastEle.val()) {
      validate.setHintValue(index,'2');
      inputEle.addClass('invalid');
      formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
    }
  };
  // 验证与密码是否不同，不同显示错误提示
  oCheckInput.confirmPassword = function(validate,formEle,inputEle,contrastEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    if (inputEle.val() !== contrastEle.val()) {
      validate.setHintValue(index,'2');
      inputEle.addClass('invalid');
      formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
    } else {
      validate.setHintValue(index,'R');
      inputEle.removeClass('invalid');
      formEle.find('.hint-info-'+index).text('').hide();
    }
  };
  // 验证手机格式，并设置错误标识
  oCheckInput.mobile = function(validate,formEle,inputEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    // 验证手机格式
    if (!oCheckFormat.mobile(inputEle.val())) {
      validate.setHintValue(index,'1');
      inputEle.addClass('invalid');
      formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
    }
  };
  // 实时验证手机格式，符合格式自动验证手机是否可用，并设置成功标识
  oCheckInput.mobileIsCorrect = function(validate,formEle,inputEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    if (!oCheckFormat.mobile(inputEle.val())) {
      validate.setHintValue(index,'1');
    } else {
      // 验证账号是否可用
      mApi.checkUsername('mobile',inputEle.val())
      .done(function(success) {
        validate.setHintValue(index,'R');
        formEle.find('.hint-icon-'+index).show();
      })
      .fail(function(error) {
        validate.setHintValue(index,'2');
        inputEle.addClass('invalid');
        formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
      });
    }
  };
  // 验证手机验证码格式，并设置错误标识
  oCheckInput.mobileCaptcha = function(validate,formEle,inputEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    // 验证验证码格式
    if (!oCheckFormat.mobileCaptcha(inputEle.val())) {
      validate.setHintValue(index,'1');
      inputEle.addClass('invalid');
      formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
    }
  };
  // 实时验证手机验证码格式，符合格式自动验证验证码是否可用，并设置成功标识
  oCheckInput.mobileCaptchaIsCorrect = function(validate,formEle,inputEle,accountEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    if (!oCheckFormat.mobileCaptcha(inputEle.val())) {
      validate.setHintValue(index,'1');
    } else {
      // 验证手机验证码
      mApi.verifyCode('mobile',inputEle.val(),accountEle.val(),'mobile')
      .done(function(success) {
        validate.setHintValue(index,'R');
        formEle.find('.hint-icon-'+index).show();
      })
      .fail(function(error) {
        validate.setHintValue(index,'2');
        inputEle.addClass('invalid');
        formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
      });
    }
  };
  // 验证邮箱格式，并设置错误标识
  oCheckInput.email = function(validate,formEle,inputEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    // 验证邮箱格式
    if (!oCheckFormat.email(inputEle.val())) {
      validate.setHintValue(index,'1');
      inputEle.addClass('invalid');
      formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
    }
  };
  // 实时验证邮箱格式，符合格式自动验证邮箱是否可用，并设置成功标识
  oCheckInput.emailIsCorrect = function(validate,formEle,inputEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    if (!oCheckFormat.email(inputEle.val())) {
      validate.setHintValue(index,'1');
    } else {
      // 验证账号是否可用
      mApi.checkUsername('email',inputEle.val())
      .done(function(success) {
        validate.setHintValue(index,'R');
        formEle.find('.hint-icon-'+index).show();
      })
      .fail(function(error) {
        validate.setHintValue(index,'2');
        inputEle.addClass('invalid');
        formEle.find('.hint-icon-'+index).hide();
        formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
      });
    }
  };
  // 验证邮件验证码格式，并设置错误标识
  oCheckInput.emailCaptcha = function(validate,formEle,inputEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    // 验证验证码格式
    if (!oCheckFormat.emailCaptcha(inputEle.val())) {
      validate.setHintValue(index,'1');
      inputEle.addClass('invalid');
      formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
    }
  };
  // 实时验证邮件验证码格式，符合格式自动验证验证码是否可用，并设置成功标识
  oCheckInput.emailCaptchaIsCorrect = function(validate,formEle,inputEle,accountEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    if (!oCheckFormat.emailCaptcha(inputEle.val())) {
      validate.setHintValue(index,'1');
    } else {
      // 验证邮件验证码
      mApi.verifyCode('email',inputEle.val(),accountEle.val(),'email')
      .done(function(success) {
        validate.setHintValue(index,'R');
        formEle.find('.hint-icon-'+index).show();
      })
      .fail(function(error) {
        validate.setHintValue(index,'2');
        inputEle.addClass('invalid');
        formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
      });
    }
  };

  // 验证图片验证码格式，并设置错误标识
  oCheckInput.imgCaptcha = function(validate,formEle,inputEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    // 验证验证码格式
    if (!oCheckFormat.imgCaptcha(inputEle.val())) {
      validate.setHintValue(index,'1');
      inputEle.addClass('invalid');
      formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
    }
  };
  // 实时验证图片验证码格式，符合格式自动验证验证码是否可用，并设置成功标识
  oCheckInput.imgCaptchaIsCorrect = function(validate,formEle,inputEle,accountEle,index) {
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      validate.setHintValue(index,'0');
      return;
    }
    if (!oCheckFormat.imgCaptcha(inputEle.val())) {
      validate.setHintValue(index,'1');
    } else {
      var accountType;
      var account = accountEle.val();
      if (oCheckFormat.mobile(account)) {
        accountType = 'mobile';
      } else if (oCheckFormat.email(account)) {
        accountType = 'email';
      }
      // 验证图片验证码
      mApi.verifyCode('img',inputEle.val(),account,accountType)
      .done(function(success) {
        validate.setHintValue(index,'R');
        formEle.find('.hint-icon-'+index).show();
      })
      .fail(function(error) {
        validate.setHintValue(index,'2');
        inputEle.addClass('invalid');
        formEle.find('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
      });
    }
  };
  // 任何需要验证前一步通过后才能进行的提交操作，都可以用这个方法。（例如，获取邮件需要通过手机号和图片验证码，提交表单需要验证整个表单项是否通过验证）
  oCheckInput.submit = function(validate,checkflag,formEle,submitFn) {
    for (var i = 0; i < checkflag.length; i++) {
      if (validate.flagHint[checkflag[i]] !== "R") {
        var jqFocusEle = formEle.find('.input-'+checkflag[i]);
        jqFocusEle.focus().addClass('invalid');
        jqFocusEle.next('.hint-info').show().text(validate.errMessage[checkflag[i]][validate.flagHint[checkflag[i]]]);
        return;
      }
    }
    submitFn();
  };

  return oCheckInput;
});
