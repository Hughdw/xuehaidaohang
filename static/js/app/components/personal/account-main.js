define(function(require) {
  var mApi = require('../api'),
      mButton = require('./button'),
      mData = require('../personal/data'),
      tplAccountMain = require('tpl/personal/account-main'),
      replaceImgPath = require('../replace-img-path');

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

    // 所有输入框，发生输入事件时，清空对应的错误提示。
    $('.form-group').on('input propertychange', '.form-control', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      jqSelf.removeClass('invalid');
      jqSelf.next('.hint-info').hide();
    });

    // 验证规则
    var fnCheckFormat = {
      password:function(str) {
        var reg = /^[^\s]{6,15}$/;
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
          $('#hint-nickname').show().text(error.message);
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
        jqConfirmPassword = $('#input-confirm-password');
    // 验证老密码格式
    jqOldPassword.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      if (jqSelf.val() === '') return;
      if (!fnCheckFormat.password(jqSelf.val())) {
        jqSelf.addClass('invalid');
        $('#hint-old-password').show().text('密码格式错误');
      }
    });
    // 验证新密码格式
    jqNewPassword.on('blur', function(event) {
      event.preventDefault();
      /* Act on the event */
      var jqSelf = $(this);
      if (jqSelf.val() === '') return;
      if (!fnCheckFormat.password(jqSelf.val())) {
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


  };

  return oAccount;
});
