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
    }
  };
  var oCheckInput = {};
  oCheckInput.nickname = function(validate,inputEle,index) {
    // 用户昵称只有一个输入框，这块的validate标记没有严格的应用

    // 输入的昵称超出长度限制，进行错误标识
    if (!oCheckFormat.nicknameLength(inputEle.val())) {
      validate.setHintValue(index,'1');
      inputEle.addClass('invalid');
      $('.hint-info-'+index).show().text(validate.errMessage[index][validate.flagHint[index]]);
      $('#button-nickname').attr('disabled','disabled');
    } else {
      validate.setHintValue(index,'0');
      inputEle.removeClass('invalid');
      $('.hint-info-'+index).hide().text('');
      $('#button-nickname').removeAttr('disabled');
    }
  };
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
      validate.setHintValue(index,'0');
      inputEle.removeClass('invalid');
      $('.hint-info-'+index).hide().text('');
    }
  };
  oCheckInput.mobile = function(formEle,inputEle,index) {
    // 实例化 验证相关的标记、提示文字、和方法。
    var oValidate = new Validate();
    // 为空返回
    if (inputEle.val() === '') {
      // 设置标记中的错误码
      oValidate.setHintValue(index,'0');
      return false;
    }
    // 验证手机格式
    if (!oCheckFormat.mobile(inputEle.val())) {
      oValidate.setHintValue(index,'2');
      inputEle.addClass('invalid');
      formEle.find('.hint-info-'+index).show().text(oValidate.errMessage[index][oValidate.flagHint[index]]);
    } else {
      // 验证账号是否可用
      mApi.checkUsername('mobile',inputEle.val())
      .done(function(success) {
        oValidate.setHintValue(index,'R');
        // formEle.find('.input-'+index).removeClass('invalid');
        // formEle.find('.ihint-info-'+index).hide();
        formEle.find('.hint-icon-'+index).show();
      })
      .fail(function(error) {
        oValidate.setHintValue(index,'3');
        inputEle.addClass('invalid');
        formEle.find('.hint-info-'+index).show().text(oValidate.errMessage[index][oValidate.flagHint[index]]);
      });
    }
  };

  return oCheckInput;
});
