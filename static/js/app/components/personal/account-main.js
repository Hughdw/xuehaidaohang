/**
 * @title 个人资料
 * @fileOverView 本文件用于加载个人资料页面的内容，实现了相关按钮的事件绑定和内容渲染。
 * @other 配合personal-center-main.js加载
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var mApi = require('components/api');
  var mButton = require('components/personal/button');
  var mRegroupData = require('components/personal/regroup-data');
  var mCheckInput = require('components/personal/check-input');
  var mAlert = require('components/alert');
  var tplAccountMain = require('tpl/personal/account-main');
  var Validate = require('components/validate');

 // ************************************
 // 声明
 // ************************************
  var oAccount = {};
 // ************************************
 // 内部方法
 // ************************************
  // 绑定事件
  oAccount._bind = function (setDone, token) {
   // ************************************
   // 声明
   // ************************************
    // console.time('_bind time');//计算运行时间
    // 触发折叠事件的按钮
    var jqAvatarBtn = $('#collapse-link-avatar');
    var jqNicknameBtn = $('#collapse-link-nickname');
    var jqPasswordBtn = $('#collapse-link-password');
    var jqMobileBtn = $('#collapse-link-mobile');
    var jqEmailBtn = $('#collapse-link-email');

    // 表单元素在validate模块中各数组的下标
    var MOBILE_INDEX = 0;
    var EMAIL_INDEX = 1;
    var IMG_CAPTCHA_INDEX = 2;
    var MOBILE_CAPTCHA_INDEX = 3;
    var EMAIL_CAPTCHE_INDEX = 4;
    var NICKNAME_INDEX = 5;
    var CURRENT_PASSWORD_INDEX = 6;
    var NEW_PASSWORD_INDEX = 7;
    var CONFIRM_PASSWORD_INDEX = 8;
   // ************************************
   // 公共部分
   // ************************************
    // 取消时，头像恢复到当前保存的状态
    function defaultAvatar () {
      var jqSeclectAvatar = $('#selected-avatar');
      // 更新当前头像
      jqCurrentAvatar.attr('src', sAvatarSavedUrl);
      jqSeclectAvatar.siblings().removeClass('active');
      jqSeclectAvatar.addClass('active');
    }
    // 取消时，绑定手机恢复到初始状态
    function defaultMobile () {
      jqEditMobile2.inputMobile.val('');
      jqBindMobile.inputMobile.val('');
      $('#collapse-mobile').find('.input-2').val('');
      $('#collapse-mobile').find('.input-3').val('');
      $('#collapse-mobile').find('.hint-icon').hide();
    }
    // 取消时，绑定手机恢复到初始状态
    function defaultEmail () {
      jqEditEmail2.inputEmail.val('');
      jqBindEmail.inputEmail.val('');
      $('#collapse-email').find('.input-2').val('');
      $('#collapse-email').find('.input-4').val('');
      $('#collapse-email').find('.hint-icon').hide();
    }
    // 折叠版块事件绑定
    // 头像
    mButton(jqAvatarBtn, '#collapse-avatar', 'avatar', true, defaultAvatar);
    // 昵称
    mButton(jqNicknameBtn, '#collapse-nickname', 'nickname', !!setDone.name);
    // 登录密码
    mButton(jqPasswordBtn, '#collapse-password', 'password', true);
    // 绑定手机
    mButton(jqMobileBtn, '#collapse-mobile', 'mobile', !!setDone.mobile, defaultMobile);
    // 绑定邮箱
    mButton(jqEmailBtn, '#collapse-email', 'email', !!setDone.email, defaultEmail);

    // 所有匹配输入框，发生输入事件时，清空对应的提示。
    $('.form-group').on('input propertychange', '.input-clear', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      jqSelf.removeClass('invalid');
      // jqSelf.next('.hint-info').hide();
      jqSelf.nextAll('span').hide();
    });

   // ************************************
   // 网站头像
   // ************************************
    // 当前头像元素
    var jqCurrentAvatar = $('#current-avatar').find('img');
    // 选择的头像链接
    var sAvatarSelectedUrl;
    // 当前保存的头像链接
    var sAvatarSavedUrl = jqCurrentAvatar.attr('src');
    // 折叠事件的主体
    var jqAvatarCollapse = $('#collapse-avatar');
    // 切换头像事件
    jqAvatarCollapse.on('click', '.avatar-link', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      // 更新 选择的头像链接
      sAvatarSelectedUrl = jqSelf.find('img').attr('src');
      // 更新当前头像
      jqCurrentAvatar.attr('src', sAvatarSelectedUrl);
      // 切换 头像列表的选择框
      jqSelf.siblings().removeClass('active');
      jqSelf.addClass('active');
    });
    // 更新头像
    $('#button-avatar').on('click', function (event) {
      event.preventDefault();
      mApi.updateAvatar(token, sAvatarSelectedUrl)
      .done(function (success) {
        sAvatarSavedUrl = sAvatarSelectedUrl;
        mAlert.success(success.message);
        // 提交头像成功：
        // 1.更新sidebar 中的头像
        $('#side-avatar').find('img').attr('src', sAvatarSavedUrl);
        // 2.更新当前头像
        jqCurrentAvatar.attr('src', sAvatarSavedUrl);
        // 3.更新头像列表选择
        var nAvatarId = jqAvatarCollapse.find('.active').data('id');
        jqAvatarCollapse.find('.avatar-link').removeAttr('id');
        $('.avatar-link-' + nAvatarId).attr('id', 'selected-avatar');
        // 收起 选择框
        jqAvatarBtn.trigger('click');
      })
      .fail(function (error) {
        mAlert.error(error.message);
      });
    });

    // ************************************
    // 用户昵称
    // ************************************
    var jqNickname = $('#input-nickname');
    var jqNicknameEditForm = $('#form-nickname-edit');
    var NicknameEditValidate = new Validate();
    // 验证昵称的输入是否超出长度
    jqNickname.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      // 实例化 验证相关的标记、提示文字、和方法。
      mCheckInput.nickname(NicknameEditValidate, jqSelf, NICKNAME_INDEX);
    });
    // 提交昵称
    $('#button-nickname').on('click', function (event) {
      event.preventDefault();
      var sNickname = jqNickname.val();
      var aCheckFlag = [5];
      mCheckInput.submit(NicknameEditValidate, aCheckFlag, jqNicknameEditForm, submit);
      function submit () {
        mApi.updateNickName(token, sNickname)
        .done(function (success) {
          mAlert.success(success.message);
          $('#des-nickname,#side-nickname').text(sNickname);
          jqNickname.val('');
          jqNicknameBtn.trigger('click');
        })
        .fail(function (error) {
          if (error.code === 201) {
            jqNickname.addClass('invalid');
            jqNicknameEditForm.find('.hint-info-5').show().text(error.message);
          } else {
            mAlert.error(error.message);
          }
        });
      }
    });

   // ************************************
   // 修改密码
   // ************************************
    var jqOldPassword = $('#input-old-password');
    var jqNewPassword = $('#input-new-password');
    var jqConfirmPassword = $('#input-confirm-password');
    var jqPasswordEditForm = $('#form-password-edit');
    var PasswordEditValidate = new Validate();

    // 验证老密码格式
    jqOldPassword.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.password(PasswordEditValidate, jqPasswordEditForm, jqSelf, CURRENT_PASSWORD_INDEX);
    });
    // 验证新密码格式
    jqNewPassword.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.password(PasswordEditValidate, jqPasswordEditForm, jqSelf, NEW_PASSWORD_INDEX);
      mCheckInput.newPassword(PasswordEditValidate, jqPasswordEditForm, jqSelf, jqOldPassword, NEW_PASSWORD_INDEX);
    });
    // 监听输入，与重复密码一致时，去除重复密码的错误提示
    jqNewPassword.on('input propertychange', function (event) {
      event.preventDefault();
      // var jqSelf = $(this);
      mCheckInput.confirmPassword(PasswordEditValidate, jqPasswordEditForm, jqConfirmPassword, jqNewPassword, CONFIRM_PASSWORD_INDEX);
    });
    // 验证重复密码是否与新密码一样
    jqConfirmPassword.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.password(PasswordEditValidate, jqPasswordEditForm, jqSelf, CONFIRM_PASSWORD_INDEX);
      mCheckInput.confirmPassword(PasswordEditValidate, jqPasswordEditForm, jqSelf, jqNewPassword, CONFIRM_PASSWORD_INDEX);
    });
    // 提交修改密码
    $('#button-password').on('click', function (event) {
      event.preventDefault();
      var aCheckFlag = [6, 7, 8];
      var sOldPassword = jqOldPassword.val();
      var sNewPassword = jqNewPassword.val();
      var sConfirmPassword = jqConfirmPassword.val();
      mCheckInput.submit(PasswordEditValidate, aCheckFlag, jqPasswordEditForm, submit);
      function submit () {
        mApi.updatePassword(token, sOldPassword, sNewPassword, sConfirmPassword)
        .done(function (success) {
          mAlert.success(success.message);// 收起 选择框
          jqPasswordBtn.trigger('click');
        })
        .fail(function (error) {
          mAlert.error(error.message);
        });
      }
    });

   // ************************************
   // 绑定或者更改 手机、邮箱时，更新图片验证码
   // ************************************
    var jqGetImgCaptcha = $('.get-img-captcha');
    // 更新图片验证码
    jqGetImgCaptcha.on('click', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      jqSelf.attr('src', mApi.getImgCaptcha());
    });
   // ************************************
   // 绑定手机
   // ************************************
    // 手机号码输入框失去焦点时
    // 1.验证当前输入格式（是否为空，是否符合正则）
    // 1.1.格式错误，进行对应提示
    // 1.2.格式正确，请求接口验证手机/邮箱是否可用（未注册则可用），进行对应的提示
    // 验证码输入框正在输入时（每次值发生变化，都要进行验证）
    // 1.验证当前输入格式是否符合正则，并且清空之前遗留的提示（这个事件已经批量绑定）
    // 1.1.不符合正则，不做操作
    // 1.2.符合正则，请求接口验证验证码是否正确，进行对应的提示，激活提交按钮。
    // 验证码输入框失去焦点时
    // 1.验证当前输入格式（是否为空，是否符合正则）
    // 1.1.格式错误，进行对应的提示
    var jqBindMobile = {
      form: $('#form-mobile-bindmobile'),
      inputMobile: $('#input-mobile-bindmobile'),
      imgCaptcha: $('#input-img-captcha-bindmobile'),
      mobileCaptcha: $('#input-mobile-captcha-bindmobile'),
      getMobileCaptcha: $('#get-mobile-captcha-bindmobile'),
      countDown: $('#captcha-countdown-bindmobile')
    };
    var BindMobileValidate = new Validate();
    // 实时验证手机格式，符合格式自动验证手机是否可用，并设置成功标识
    jqBindMobile.inputMobile.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.mobileIsCorrect(BindMobileValidate, jqBindMobile.form, jqSelf, MOBILE_INDEX);
    });
    // 验证手机格式，并设置错误标示
    jqBindMobile.inputMobile.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.mobile(BindMobileValidate, jqBindMobile.form, jqSelf, MOBILE_INDEX);
    });
    // 实时验证验证码格式，符合格式自动验证验证码是否正确，并设置成功标识
    jqBindMobile.imgCaptcha.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.imgCaptchaIsCorrect(BindMobileValidate, jqBindMobile.form, jqSelf, jqBindMobile.inputMobile, IMG_CAPTCHA_INDEX);
    });
    // 验证验证码格式，并设置错误标识
    jqBindMobile.imgCaptcha.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.imgCaptcha(BindMobileValidate, jqBindMobile.form, jqSelf, IMG_CAPTCHA_INDEX);
    });
    // 获取短信验证码
    jqBindMobile.getMobileCaptcha.on('click', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      var aCheckFlag = [0, 2];
      var vIntervalId;
      var nTotal = 60;
      // 检查手机号和验证码是否正确
      mCheckInput.submit(BindMobileValidate, aCheckFlag, jqBindMobile.form, submit);
      function submit () {
        mApi.getMobileCode(0, jqBindMobile.inputMobile.val())
        .done(function (success) {
          jqSelf.hide();
          jqBindMobile.countDown.show().text(nTotal + '秒后重发');
          vIntervalId = setInterval(function () {
            if (nTotal < 0) return;
            nTotal--;
            jqBindMobile.countDown.text(nTotal + '秒后重发');
            if (nTotal === 0) {
              clearInterval(vIntervalId);
              jqBindMobile.countDown.hide();
              jqSelf.show();
            }
          }, 1000);
        })
        .fail(function (error) {
          mAlert.error(error.message);
          jqBindMobile.imgCaptcha.text('').focus();
        });
      }
    });
    // 实时验证验证码格式，符合格式自动验证验证码是否正确，并设置成功标识
    jqBindMobile.mobileCaptcha.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.mobileCaptchaIsCorrect(BindMobileValidate, jqBindMobile.form, jqSelf, jqBindMobile.inputMobile, MOBILE_CAPTCHA_INDEX);
    });
    // 验证验证码格式，并设置错误标识
    jqBindMobile.mobileCaptcha.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.mobileCaptcha(BindMobileValidate, jqBindMobile.form, jqSelf, MOBILE_CAPTCHA_INDEX);
    });
    // 提交绑定手机
    $('#button-mobile-bindmobile').on('click', function (event) {
      event.preventDefault();
      var aCheckFlag = [0, 2, 3];
      mCheckInput.submit(BindMobileValidate, aCheckFlag, jqBindMobile.form, submit);
      function submit () {
        mApi.updateMobile(token, jqBindMobile.inputMobile.val())
        .done(function (success) {
          mAlert.success(success.message);
          // 收起 选择框
          jqMobileBtn.trigger('click');
        })
        .fail(function (error) {
          mAlert.error(error.message);
        });
      }
    });
   // ************************************
   // 更换手机
   // ************************************
    var jqEditMobile1 = {
      form: $('#form-mobile-editmobile1'),
      inputMobile: $('#input-old-mobile'),
      mobileCaptcha: $('#input-mobile-captcha-editmobile1'),
      getMobileCaptcha: $('#get-mobile-captcha-editmobile1'),
      countDown: $('#captcha-countdown-editmobile1')
    };
    var MobileValidateEdit1 = new Validate();
    // 获取短信验证码
    jqEditMobile1.getMobileCaptcha.on('click', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      var vIntervalId;
      var nTotal = 60;
      mApi.getMobileCode(2, jqEditMobile1.inputMobile.val())
      .done(function (success) {
        jqSelf.hide();
        jqEditMobile1.countDown.show().text(nTotal + '秒后重发');
        vIntervalId = setInterval(function () {
          if (nTotal < 0) return;
          nTotal--;
          jqEditMobile1.countDown.text(nTotal + '秒后重发');
          if (nTotal === 0) {
            clearInterval(vIntervalId);
            jqEditMobile1.countDown.hide();
            jqSelf.show();
          }
        }, 1000);
      })
      .fail(function (error) {
        mAlert.error(error.message);
      });
    });
    // 实时验证验证码格式，符合格式自动验证验证码是否正确，并设置成功标识
    jqEditMobile1.mobileCaptcha.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.mobileCaptchaIsCorrect(MobileValidateEdit1, jqEditMobile1.form, jqSelf, jqEditMobile1.inputMobile, MOBILE_CAPTCHA_INDEX);
    });
    // 验证验证码格式，并设置错误标识
    jqEditMobile1.mobileCaptcha.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.mobileCaptcha(MobileValidateEdit1, jqEditMobile1.form, jqSelf, MOBILE_CAPTCHA_INDEX);
    });
    // 提交绑定手机
    $('#button-mobile-editmobile1').on('click', function (event) {
      event.preventDefault();
      var aCheckFlag = [3];
      mCheckInput.submit(MobileValidateEdit1, aCheckFlag, jqEditMobile1.form, submit);
      function submit () {
        mApi.verifyOldAccount(token, jqEditMobile1.inputMobile.val(), 'mobile')
        .done(function (success) {
          jqEditMobile1.form.slideUp('fast');
          jqEditMobile2.form.slideDown('fast');
        })
        .fail(function (error) {
          mAlert.error(error.message);
        });
      }
    });
    var jqEditMobile2 = {
      form: $('#form-mobile-editmobile2'),
      inputMobile: $('#input-new-mobile'),
      mobileCaptcha: $('#input-mobile-captcha-editmobile2'),
      getMobileCaptcha: $('#get-mobile-captcha-editmobile2'),
      countDown: $('#captcha-countdown-editmobile2')
    };
    var MobileValidateEdit2 = new Validate();
    // 实时验证手机格式，符合格式自动验证手机是否可用，并设置成功标识
    jqEditMobile2.inputMobile.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.mobileIsCorrect(MobileValidateEdit2, jqEditMobile2.form, jqSelf, MOBILE_INDEX);
    });
    // 验证手机格式，并设置错误标示
    jqEditMobile2.inputMobile.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.mobile(MobileValidateEdit2, jqEditMobile2.form, jqSelf, MOBILE_INDEX);
    });
    // 获取短信验证码
    jqEditMobile2.getMobileCaptcha.on('click', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      var aCheckFlag = [0];
      var vIntervalId;
      var nTotal = 60;
      mCheckInput.submit(MobileValidateEdit2, aCheckFlag, jqEditMobile2.form, submit);
      function submit () {
        mApi.getMobileCode(3, jqEditMobile2.inputMobile.val())
        .done(function (success) {
          jqSelf.hide();
          jqEditMobile2.countDown.show().text(nTotal + '秒后重发');
          vIntervalId = setInterval(function () {
            if (nTotal < 0) return;
            nTotal--;
            jqEditMobile2.countDown.text(nTotal + '秒后重发');
            if (nTotal === 0) {
              clearInterval(vIntervalId);
              jqEditMobile2.countDown.hide();
              jqSelf.show();
            }
          }, 1000);
        })
        .fail(function (error) {
          mAlert.error(error.message);
        });
      }
    });
    // 实时验证验证码格式，符合格式自动验证验证码是否正确，并设置成功标识
    jqEditMobile2.mobileCaptcha.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.mobileCaptchaIsCorrect(MobileValidateEdit2, jqEditMobile2.form, jqSelf, jqEditMobile2.inputMobile, MOBILE_CAPTCHA_INDEX);
    });
    // 验证验证码格式，并设置错误标识
    jqEditMobile2.mobileCaptcha.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.mobileCaptcha(MobileValidateEdit2, jqEditMobile2.form, jqSelf, MOBILE_CAPTCHA_INDEX);
    });
    // 提交绑定手机
    $('#button-mobile-editmobile2').on('click', function (event) {
      event.preventDefault();
      var aCheckFlag = [0, 3];
      var nNewMobile = jqEditMobile2.inputMobile.val();
      mCheckInput.submit(MobileValidateEdit2, aCheckFlag, jqEditMobile2.form, submit);
      function submit () {
        mApi.updateMobile(token, nNewMobile)
        .done(function (success) {
          mAlert.success(success.message);// 收起 选择框
          $('#des-mobile').text(nNewMobile);
          jqEditMobile1.inputMobile.val(nNewMobile);
          jqEditMobile1.form.slideDown('fast');
          jqEditMobile2.form.slideUp('fast');
          jqMobileBtn.trigger('click');
        })
        .fail(function (error) {
          mAlert.error(error.message);
        });
      }
    });


   // ************************************
   // 绑定邮箱
   // ************************************
    var jqBindEmail = {
      form: $('#form-email-bindemail'),
      inputEmail: $('#input-email-bindemail'),
      imgCaptcha: $('#input-img-captcha-bindemail'),
      emailCaptcha: $('#input-email-captcha-bindemail'),
      getEmailCaptcha: $('#get-email-captcha-bindemail'),
      countDown: $('#captcha-countdown-bindemail')
    };
    var BindEmailValidate = new Validate();
    // 实时验证邮箱格式，符合格式自动验证邮箱是否可用，并设置成功标识
    jqBindEmail.inputEmail.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.emailIsCorrect(BindEmailValidate, jqBindEmail.form, jqSelf, EMAIL_INDEX);
    });
    // 验证邮箱格式，并设置错误标示
    jqBindEmail.inputEmail.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.email(BindEmailValidate, jqBindEmail.form, jqSelf, EMAIL_INDEX);
    });
    // 实时验证验证码格式，符合格式自动验证验证码是否正确，并设置成功标识
    jqBindEmail.imgCaptcha.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.imgCaptchaIsCorrect(BindEmailValidate, jqBindEmail.form, jqSelf, jqBindEmail.inputEmail, IMG_CAPTCHA_INDEX);
    });
    // 验证验证码格式，并设置错误标识
    jqBindEmail.imgCaptcha.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.imgCaptcha(BindEmailValidate, jqBindEmail.form, jqSelf, IMG_CAPTCHA_INDEX);
    });
    // 获取短信验证码
    jqBindEmail.getEmailCaptcha.on('click', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      var aCheckFlag = [1, 2];
      var vIntervalId;
      var nTotal = 60;
      // 检查邮箱号和验证码是否正确
      mCheckInput.submit(BindEmailValidate, aCheckFlag, jqBindEmail.form, submit);
      function submit () {
        mApi.getEmailCode(0, jqBindEmail.inputEmail.val())
        .done(function (success) {
          jqSelf.hide();
          jqBindEmail.countDown.show().text(nTotal + '秒后重发');
          vIntervalId = setInterval(function () {
            if (nTotal < 0) return;
            nTotal--;
            jqBindEmail.countDown.text(nTotal + '秒后重发');
            if (nTotal === 0) {
              clearInterval(vIntervalId);
              jqBindEmail.countDown.hide();
              jqSelf.show();
            }
          }, 1000);
        })
        .fail(function (error) {
          mAlert.error(error.message);
          jqBindEmail.imgCaptcha.text('').focus();
        });
      }
    });
    // 实时验证验证码格式，符合格式自动验证验证码是否正确，并设置成功标识
    jqBindEmail.emailCaptcha.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.emailCaptchaIsCorrect(BindEmailValidate, jqBindEmail.form, jqSelf, jqBindEmail.inputEmail, EMAIL_CAPTCHE_INDEX);
    });
    // 验证验证码格式，并设置错误标识
    jqBindEmail.emailCaptcha.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.emailCaptcha(BindEmailValidate, jqBindEmail.form, jqSelf, EMAIL_CAPTCHE_INDEX);
    });
    // 提交绑定邮箱
    $('#button-email-bindemail').on('click', function (event) {
      event.preventDefault();
      var aCheckFlag = [1, 2, 4];
      mCheckInput.submit(BindEmailValidate, aCheckFlag, jqBindEmail.form, submit);
      function submit () {
        mApi.updateEmail(token, jqBindEmail.inputEmail.val())
        .done(function (success) {
          mAlert.success(success.message);
          // 收起 选择框
          jqEmailBtn.trigger('click');
        })
        .fail(function (error) {
          mAlert.error(error.message);
        });
      }
    });

   // ************************************
   // 更换邮箱
   // ************************************
    var jqEditEmail1 = {
      form: $('#form-email-editemail1'),
      inputEmail: $('#input-old-email'),
      emailCaptcha: $('#input-email-captcha-editemail1'),
      getEmailCaptcha: $('#get-email-captcha-editemail1'),
      countDown: $('#captcha-countdown-editemail1')
    };
    var EmailValidateEdit1 = new Validate();
    // 获取邮件验证码
    jqEditEmail1.getEmailCaptcha.on('click', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      var vIntervalId;
      var nTotal = 60;
      mApi.getEmailCode(2, jqEditEmail1.inputEmail.val())
      .done(function (success) {
        jqSelf.hide();
        jqEditEmail1.countDown.show().text(nTotal + '秒后重发');
        vIntervalId = setInterval(function () {
          if (nTotal < 0) return;
          nTotal--;
          jqEditEmail1.countDown.text(nTotal + '秒后重发');
          if (nTotal === 0) {
            clearInterval(vIntervalId);
            jqEditEmail1.countDown.hide();
            jqSelf.show();
          }
        }, 1000);
      })
      .fail(function (error) {
        mAlert.error(error.message);
      });
    });
    // 实时验证验证码格式，符合格式自动验证验证码是否正确，并设置成功标识
    jqEditEmail1.emailCaptcha.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.emailCaptchaIsCorrect(EmailValidateEdit1, jqEditEmail1.form, jqSelf, jqEditEmail1.inputEmail, EMAIL_CAPTCHE_INDEX);
    });
    // 验证验证码格式，并设置错误标识
    jqEditEmail1.emailCaptcha.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.emailCaptcha(EmailValidateEdit1, jqEditEmail1.form, jqSelf, EMAIL_CAPTCHE_INDEX);
    });
    // 提交绑定邮箱
    $('#button-email-editemail1').on('click', function (event) {
      event.preventDefault();
      var aCheckFlag = [4];
      mCheckInput.submit(EmailValidateEdit1, aCheckFlag, jqEditEmail1.form, submit);
      function submit () {
        mApi.verifyOldAccount(token, jqEditEmail1.inputEmail.val(), 'email')
        .done(function (success) {
          jqEditEmail1.form.slideUp('fast');
          jqEditEmail2.form.slideDown('fast');
        })
        .fail(function (error) {
          mAlert.error(error.message);
        });
      }
    });
    var jqEditEmail2 = {
      form: $('#form-email-editemail2'),
      inputEmail: $('#input-new-email'),
      emailCaptcha: $('#input-email-captcha-editemail2'),
      getEmailCaptcha: $('#get-email-captcha-editemail2'),
      countDown: $('#captcha-countdown-editemail2')
    };
    var EmailValidateEdit2 = new Validate();
    // 实时验证邮箱格式，符合格式自动验证邮箱是否可用，并设置成功标识
    jqEditEmail2.inputEmail.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.emailIsCorrect(EmailValidateEdit2, jqEditEmail2.form, jqSelf, EMAIL_INDEX);
    });
    // 验证邮箱格式，并设置错误标示
    jqEditEmail2.inputEmail.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.email(EmailValidateEdit2, jqEditEmail2.form, jqSelf, EMAIL_INDEX);
    });
    // 获取邮件验证码
    jqEditEmail2.getEmailCaptcha.on('click', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      var aCheckFlag = [1];
      var vIntervalId;
      var nTotal = 60;
      // 检查邮箱地址是否正确
      mCheckInput.submit(EmailValidateEdit2, aCheckFlag, jqEditEmail2.form, submit);
      function submit () {
        mApi.getEmailCode(3, jqEditEmail2.inputEmail.val())
        .done(function (success) {
          jqSelf.hide();
          jqEditEmail2.countDown.show().text(nTotal + '秒后重发');
          vIntervalId = setInterval(function () {
            if (nTotal < 0) return;
            nTotal--;
            jqEditEmail2.countDown.text(nTotal + '秒后重发');
            if (nTotal === 0) {
              clearInterval(vIntervalId);
              jqEditEmail2.countDown.hide();
              jqSelf.show();
            }
          }, 1000);
        })
        .fail(function (error) {
          mAlert.error(error.message);
        });
      }
    });
    // 实时验证验证码格式，符合格式自动验证验证码是否正确，并设置成功标识
    jqEditEmail2.emailCaptcha.on('input propertychange', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.emailCaptchaIsCorrect(EmailValidateEdit2, jqEditEmail2.form, jqSelf, jqEditEmail2.inputEmail, EMAIL_CAPTCHE_INDEX);
    });
    // 验证验证码格式，并设置错误标识
    jqEditEmail2.emailCaptcha.on('blur', function (event) {
      event.preventDefault();
      var jqSelf = $(this);
      mCheckInput.emailCaptcha(EmailValidateEdit2, jqEditEmail2.form, jqSelf, EMAIL_CAPTCHE_INDEX);
    });
    // 提交绑定邮箱
    $('#button-email-editemail2').on('click', function (event) {
      event.preventDefault();
      var aCheckFlag = [1, 4];
      var nNewEmail = jqEditEmail2.inputEmail.val();
      mCheckInput.submit(EmailValidateEdit2, aCheckFlag, jqEditEmail2.form, submit);
      function submit () {
        mApi.updateEmail(token, nNewEmail)
        .done(function (success) {
          mAlert.success(success.message);// 收起 选择框
          $('#des-email').text(nNewEmail);
          jqEditEmail1.inputEmail.val(nNewEmail);
          jqEditEmail1.form.slideDown('fast');
          jqEditEmail2.form.slideUp('fast');
          jqEmailBtn.trigger('click');
        })
        .fail(function (error) {
          mAlert.error(error.message);
        });
      }
    });
    // console.timeEnd('_bind time');
  };
 // ************************************
 // 对外暴露方法
 // ************************************
  // 加载内容
  oAccount.loadContent = function (userData, token) {
    // 获取头像列表
    mApi.getAvatarList(token)
    .done(function (success) {
      // 重新组织 账户资料 的数据
      var oAccountData = mRegroupData.account(success.data, userData);
      document.getElementById('mainbar').innerHTML = tplAccountMain(oAccountData);
      oAccount._bind(oAccountData, token);
    })
    .fail(function (error) {
      // 临时处理方式
      mAlert.error(error);
    });
  };

  return oAccount.loadContent;
});
