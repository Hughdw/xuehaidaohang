define(function(require) {
  var mApi = require('components/api'),
      mButton = require('components/personal/button'),
      mData = require('components/personal/data'),
      mCheckInput = require('components/personal/check-input'),
      mAlert = require('components/alert'),
      tplAccountMain = require('tpl/personal/account-main'),
      // replaceImgPath = require('components/replace-img-path'),
      Validate = require('components/validate');

  var oAccount = {};

  // 加载内容
  oAccount.loadContent = function(userData,token_p) {
    // 获取头像列表
    mApi.getAvatarList(token_p)
    .done(function(success) {
      // 重新组织 账户资料 的数据
      var accountData = mData.regroupAccount(success.data,userData);
      document.getElementById('mainbar').innerHTML = tplAccountMain(accountData);
      oAccount._bind(accountData,token_p);
      // replaceImgPath();
    })
    .fail(function(error) {

    });
  };
  // 绑定事件
  oAccount._bind = function(setDone,token_p) {
    // 触发折叠事件的按钮
    var jqAvatarBtn = $('#collapse-link-avatar');
    var jqNicknameBtn = $('#collapse-link-nickname');
    var jqPasswordBtn = $('#collapse-link-password');
    var jqMobileBtn = $('#collapse-link-mobile');
    var jqEmailBtn = $('#collapse-link-email');
    // ************************************
    // 公共部分
    // ************************************
    // 折叠版块事件绑定
    // 头像
    mButton.bindEvent(jqAvatarBtn,'#collapse-avatar','avatar',true,fnDefaultAvatar);
    // 昵称
    mButton.bindEvent(jqNicknameBtn,'#collapse-nickname','nickname',!!setDone.name);
    // 登录密码
    mButton.bindEvent(jqPasswordBtn,'#collapse-password','password',true);
    // 绑定手机
    mButton.bindEvent(jqMobileBtn,'#collapse-mobile','mobile',!!setDone.mobile);
    // 绑定邮箱
    mButton.bindEvent(jqEmailBtn,'#collapse-email','email',!!setDone.email);

    // 所有匹配输入框，发生输入事件时，清空对应的提示。
    $('.form-group').on('input propertychange', '.input-clear', function(event) {
      event.preventDefault();
      /* Act on the event */
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
    jqAvatarCollapse.on('click', '.avatar-link', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      // 更新 选择的头像链接
      sAvatarSelectedUrl = jqSelf.find('img').attr('src');
      // 更新当前头像
      jqCurrentAvatar.attr('src',sAvatarSelectedUrl);
      // 切换 头像列表的选择框
      jqSelf.siblings().removeClass('active');
      jqSelf.addClass('active');
    });
    // 更新头像
    $('#button-avatar').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      mApi.updateAvatar(token_p,sAvatarSelectedUrl)
      .done(function(success) {
        sAvatarSavedUrl = sAvatarSelectedUrl;
        mAlert.success(success.message);
        // 提交头像成功：
        // 1.更新sidebar 中的头像
        $('#side-avatar').find('img').attr('src',sAvatarSavedUrl);
        // 2.更新当前头像
        jqCurrentAvatar.attr('src',sAvatarSavedUrl);
        // 3.更新头像列表选择
        var num = jqAvatarCollapse.find('.active').data('id');
        jqAvatarCollapse.find('.avatar-link').removeAttr('id');
        $('.avatar-link-'+num).attr('id','selected-avatar');
        // 收起 选择框
        jqAvatarBtn.trigger('click');
      })
      .fail(function(error) {
        mAlert.error(error.message);
      });
    });
    // 取消时，头像恢复到当前保存的状态
    function fnDefaultAvatar () {
      var jqSeclectAvatar = $('#selected-avatar');
      // 更新当前头像
      jqCurrentAvatar.attr('src',sAvatarSavedUrl);
      jqSeclectAvatar.siblings().removeClass('active');
      jqSeclectAvatar.addClass('active');
    }

    // ************************************
    // 用户昵称
    // ************************************
    var jqNickname = $('#input-nickname'),
        jqNicknameEditForm = $('#form-nickname-edit'),
        NicknameEditValidate = new Validate();
    // 验证昵称的输入是否超出长度
    jqNickname.on('input propertychange', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      // 实例化 验证相关的标记、提示文字、和方法。
      mCheckInput.nickname(NicknameEditValidate,jqSelf,5);
    });
    // 提交昵称
    $('#button-nickname').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      var sNickname = jqNickname.val();
      var aCheckFlag = [5];
      mCheckInput.submit(NicknameEditValidate,aCheckFlag,jqNicknameEditForm,fnSubmit);
      function fnSubmit () {
        mApi.updateNickName(token_p,sNickname)
        .done(function(success) {
          mAlert.success(success.message);
          $('#des-nickname,#side-nickname').text(sNickname);
          jqNickname.val('');
          jqNicknameBtn.trigger('click');
        })
        .fail(function(error) {
          if (error.code === 201) {
            jqNickname.addClass('invalid');
            $('#hint-edit-nickname').show().text(error.message);
          } else {
            mAlert.error(error.message);
          }
        });
      }
    });

    // ************************************
    // 修改密码
    // ************************************
    var jqOldPassword = $('#input-old-password'),
        jqNewPassword = $('#input-new-password'),
        jqConfirmPassword = $('#input-confirm-password'),
        jqPasswordEditForm = $('#form-password-edit'),
        PasswordEditValidate = new Validate();
    // 验证老密码格式
    jqOldPassword.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      mCheckInput.password(PasswordEditValidate,jqPasswordEditForm,jqSelf,6);
    });
    // 验证新密码格式
    jqNewPassword.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      mCheckInput.password(PasswordEditValidate,jqPasswordEditForm,jqSelf,7);
      mCheckInput.newPassword(PasswordEditValidate,jqPasswordEditForm,jqSelf,jqOldPassword,7);
    });
    // 监听输入，与重复密码一致时，去除重复密码的错误提示
    jqNewPassword.on('input propertychange', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      mCheckInput.confirmPassword(PasswordEditValidate,jqPasswordEditForm,jqConfirmPassword,jqNewPassword,8);
    });
    // 验证重复密码是否与新密码一样
    jqConfirmPassword.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      mCheckInput.password(PasswordEditValidate,jqPasswordEditForm,jqSelf,8);
      mCheckInput.confirmPassword(PasswordEditValidate,jqPasswordEditForm,jqSelf,jqNewPassword,8);
    });
    // 提交修改密码
    $('#button-password').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      var aCheckFlag = [6,7,8];
      var sOldPassword = jqOldPassword.val(),
          sNewPassword = jqNewPassword.val(),
          sConfirmPassword = jqConfirmPassword.val();
      mCheckInput.submit(PasswordEditValidate,aCheckFlag,jqPasswordEditForm,fnSubmit);
      function fnSubmit () {
        mApi.updatePassword(token_p,sOldPassword,sNewPassword,sConfirmPassword)
        .done(function(success) {
          mAlert.success(success.message);// 收起 选择框
          jqPasswordBtn.trigger('click');
        })
        .fail(function(error) {
          mAlert.error(error.message);
        });
      }
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
    var jqBindMobileForm = $('#form-mobile-bind'),
        jqMobileNum = $('#input-mobile'),
        jqBindImgCaptcha = $('#input-bind-img-captcha'),
        jqBindMobileCaptcha = $('#input-bind-mobile-captcha'),
        jqGetMobileCaptcha = jqBindMobileForm.find('.get-mobile-captcha'),
        jqGetImgCaptcha = jqBindMobileForm.find('.get-img-captcha'),
        jqCountDown = jqBindMobileForm.find('.countdown'),
        BindMobileValidate = new Validate();
    // 实时验证手机格式，符合格式自动验证手机是否可用，并设置成功标识
    jqMobileNum.on('input propertychange', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      mCheckInput.mobileIsCorrect(BindMobileValidate,jqBindMobileForm,jqSelf,0);
    });
    // 验证手机格式，并设置错误标示
    jqMobileNum.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      mCheckInput.mobile(BindMobileValidate,jqBindMobileForm,jqSelf,0);
    });
    // 实时验证验证码格式，符合格式自动验证验证码是否正确，并设置成功标识
    jqBindImgCaptcha.on('input propertychange', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      mCheckInput.imgCaptchaIsCorrect(BindMobileValidate,jqBindMobileForm,jqSelf,jqMobileNum,2);
    });
    // 验证验证码格式，并设置错误标识
    jqBindImgCaptcha.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      mCheckInput.imgCaptcha(BindMobileValidate,jqBindMobileForm,jqSelf,2);
    });
    //更新图片验证码
    jqGetImgCaptcha.on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      jqSelf.attr('src',mApi.getImgCaptcha());
    });
    // 获取短信验证码
    jqGetMobileCaptcha.on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      var aCheckFlag = [0,2];
      var vIntervalId;
      var nTotal = 30;
      // 检查手机号和验证码是否正确
      mCheckInput.submit(BindMobileValidate,aCheckFlag,jqBindMobileForm,fnSubmit);
      function fnSubmit () {
        mApi.getMobileCode(0,jqMobileNum.val())
        .done(function(success) {
          jqSelf.hide();
          jqCountDown.show().text(nTotal+'秒后重发');
          vIntervalId = setInterval(function() {
            if (nTotal < 0) return;
            nTotal--;
            jqCountDown.text(nTotal+'秒后重发');
            if (nTotal === 0) {
              clearInterval(vIntervalId);
              jqCountDown.hide();
              jqSelf.show();
            }
          },1000);
        })
        .fail(function(error) {
          mAlert.error(error.message);
          jqBindImgCaptcha.text('').focus();
        });
      }
    });
    //实时验证验证码格式，符合格式自动验证验证码是否正确，并设置成功标识
    jqBindMobileCaptcha.on('input propertychange', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      mCheckInput.mobileCaptchaIsCorrect(BindMobileValidate,jqBindMobileForm,jqSelf,jqMobileNum,3);
    });
    // 验证验证码格式，并设置错误标识
    jqBindMobileCaptcha.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      mCheckInput.mobileCaptcha(BindMobileValidate,jqBindMobileForm,jqSelf,3);
    });
    // 提交绑定手机
    $('#button-bind-mobile').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      var aCheckFlag = [0,2,3];
      mCheckInput.submit(BindMobileValidate,aCheckFlag,jqBindMobileForm,fnSubmit);
      function fnSubmit () {
        mApi.updateMobile(token_p,jqMobileNum.val())
        .done(function(success) {
          mAlert.success(success.message);// 收起 选择框
          jqMobileBtn.trigger('click');
        })
        .fail(function(error) {
          mAlert.error(error.message);
        });
      }
    });
    // ************************************
    // 更换手机
    // ************************************
    var jqEditMobileForm = $('#form-mobile-edit')




  };



  return oAccount;
});
