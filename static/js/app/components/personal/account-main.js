define(function(require) {
  var mApi = require('components/api'),
      mButton = require('components/personal/button'),
      mData = require('components/personal/data'),
      mCheckInput = require('components/personal/check-input'),
      tplAccountMain = require('tpl/personal/account-main'),
      replaceImgPath = require('components/replace-img-path'),
      Validate = require('components/validate');

  var oAccount = {};

  // 加载内容
  oAccount.loadContent = function(userData,token) {
    // 获取头像列表
    mApi.getAvatarList(token)
    .done(function(success) {
      // 重新组织 账户资料 的数据
      var accountData = mData.regroupAccount(success.data,userData);
      document.getElementById('mainbar').innerHTML = tplAccountMain(accountData);
      oAccount._bind(accountData,token);
      // replaceImgPath();
    })
    .fail(function(error) {

    });
  };
  // 绑定事件
  oAccount._bind = function(setDone,token) {
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

    // 所有输入框，发生输入事件时，清空对应的提示。
    $('.form-group').on('input propertychange', '.input-clear', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      jqSelf.removeClass('invalid');
      jqSelf.next('.hint-info').hide();
      jqSelf.nextAll('.hint-icon').hide();
    });

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
    // 操作结果提示
    var oAlert = {
      success : function(message) {
        $('#alert-success-txt').text(message);
        $('#alert-success').slideDown('fast').delay(3000).slideUp('fast');
      },
      error : function(message) {
        $('#alert-danger-txt').text(message);
        $('#alert-danger').slideDown('fast').delay(3000).slideUp('fast');
      }
    };

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
      mApi.updateAvatar(token,sAvatarSelectedUrl)
      .done(function(success) {
        sAvatarSavedUrl = sAvatarSelectedUrl;
        oAlert.success(success.message);

        // 提交头像成功：
        // 1.更新sidebar 中的头像\
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
        oAlert.error(error.message);
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
    // 验证昵称的输入是否超出长度
    $('#input-nickname').on('input propertychange', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      // 实例化 验证相关的标记、提示文字、和方法。
      var oValidate = new Validate();
      // var bJudge = oCheckFormat.nicknameLength(jqSelf.val());
      mCheckInput.nickname(oValidate,jqSelf,5);
    });
    // 提交昵称
    $('#button-nickname').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqInputNickname = $('#input-nickname');
      var nickname = jqInputNickname.val();
      mApi.updateNickName(token,nickname)
      .done(function(success) {
        oAlert.success(success.message);
        $('#des-nickname,#side-nickname').text(nickname);
        jqInputNickname.val('');
        jqNicknameBtn.trigger('click');
      })
      .fail(function(error) {
        if (error.code === 201) {
          jqInputNickname.addClass('invalid');
          $('#hint-edit-nickname').show().text(error.message);
        } else {
          oAlert.error(error.message);
        }
      });
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
      console.log(PasswordEditValidate);
    });
    // 验证新密码格式
    jqNewPassword.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      if (jqSelf.val() === '') return;
      if (!oCheckFormat.password(jqSelf.val())) {
        jqSelf.addClass('invalid');
        $('#hint-new-password').show().text('密码格式错误');
      } else if (jqSelf.val() === jqOldPassword.val()) {
        jqSelf.addClass('invalid');
        $('#hint-new-password').show().text('不能与老密码一样');
      }
    });
    // 监听输入，与重复密码一致时，去除重复密码的错误提示
    jqNewPassword.on('input propertychange', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      if (jqSelf.val() === jqConfirmPassword.val()) {
        jqConfirmPassword.removeClass('invalid');
        $('#hint-confirm-password').hide();
      }
    });

    // 验证重复密码是否与新密码一样
    jqConfirmPassword.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      if (jqSelf.val() === '') return;
      if (jqSelf.val() !== jqNewPassword.val()) {
        jqSelf.addClass('invalid');
        $('#hint-confirm-password').show().text('两次密码不一样');
      }
    });

    // 提交修改密码
    $('#button-password').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      var oldPassword = jqOldPassword.val(),
          newPassword = jqNewPassword.val(),
          confirmPassword = jqConfirmPassword.val();
          mApi.updatePassword(token,oldPassword,newPassword,confirmPassword)
          .done(function(success) {
            oAlert.success(success.message);// 收起 选择框
            jqPasswordBtn.trigger('click');
          })
          .fail(function(error) {
            oAlert.error(error.message);
          });
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
    var jqMobileNum = $('#input-mobile'),
        jqGetMobileCaptcha = $('.get-mobile-captcha');
    // 验证手机格式
    jqMobileNum.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      // 当前所在表单
      var jqForm = $('#form-mobile-bind');
      var checkItem = [0,3];
      mCheckInput.mobile(jqForm,jqSelf,0);
    });
    // 获取短信验证码
    jqGetMobileCaptcha.on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);

    });
    // 提交绑定手机
    $('#button-bind-mobile').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */

    });
  };

  return oAccount;
});
