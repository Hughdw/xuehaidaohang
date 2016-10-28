/**
 * 为自定义指令提供事件绑定、验证服务。
 * 1.验证账号格式是否正确，同时是否存在。
 * 2.验证密码格式是否正确。
 */
angular.module('sign-service', [])
.constant('FOCUS_CLASS', 'ng-focused')
.service('submitForm', function (apiService, FOCUS_CLASS) {
  /* 账号验证规则 */
  var fnAccountFormat = {
    mobile: function (str) {
      var reg = /^(13|14|15|18|17)\d{9}$/;
      return reg.test(str);
    },
    email: function (str) {
      var reg = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+[-a-zA-Z0-9]*)+[a-zA-Z0-9]+$/;
      return reg.test(str);
    }
  };
  /* 密码验证规则 */
  var fnPasswordFormat = {
    password: function (str) {
      var reg = /^[^\s]{6,15}$/;
      return reg.test(str);
    }
  };
  /* 储存通过参数传入的对象（socpe,iEle,iAttrs,ctrl） */
  var oArgs = {
    account: '',
    password: ''
  };
  /* 检查输入的字符是否符合规则 */
  var fnCheckInput = {};
  fnCheckInput.account = function (scope, iEle, iAttrs, ctrl, isSubmit) {
    // 分两种情况，1.控件失去焦点。2.提交表单。
    // 1.1.为空时，不进行验证，直接返回。
    // 1.2.不为空时，进行正则验证，并设置账号类型。
    // 1.2.1.正则未通过，显示错误。
    // 1.2.2.正则通过，请求API。
    // 2.1.为空时，显示错误，并且返回。
    // 2.2.不为空时，进行正则验证，并设置账号类型。直接返回。

    /* 账号为空时的处理 */
    if (ctrl.$isEmpty(ctrl.$viewValue) && !isSubmit) {
      // 同时不是表单提交，直接返回
      return;
    } else if (ctrl.$isEmpty(ctrl.$viewValue) && isSubmit) {
      // 同时是表单提交时：
      // 设置错误标示 empty
      // 显示提示
      // 添加焦点显示类
      ctrl.$setValidity('empty', false);
      ctrl.$showhint = true;
      iEle.addClass(FOCUS_CLASS);
      return;
    }

    /* 记录账号类型 */
    // 正确时，记录账号类型
    if (fnAccountFormat.mobile(ctrl.$viewValue)) {
      scope.loginUser.type = 'mobile';
    } else if (fnAccountFormat.email(ctrl.$viewValue)) {
      scope.loginUser.type = 'email';
    } else {
      scope.loginUser.type = false;
    }

    /* 账号格式是否正确 */
    var bFormat = !!scope.loginUser.type;
    /* 用于区分显示手机账号/邮箱账号未注册提示 */
    ctrl.$accountType = scope.loginUser.type;

    /* 账号不为空时的处理 */
    // 提交表单不做任何处理
    !isSubmit && scope.$apply(function () {
          // 设置验证规则是否通过
      ctrl.$setValidity('pattern', bFormat);
      if (!bFormat) {
            /* 格式不正确时 */
            // 设置文字提示为显示
        ctrl.$showhint = true;
            // 控制边框显示红色
        iEle.addClass(FOCUS_CLASS);
      } else {
            /* 格式正确时 */
            // 验证账号是否存在
        apiService.checkAccount(scope.loginUser.type, ctrl.$viewValue).then(
              function (seccess) {
                // 账号不存在，不能登录
                // 1.邮箱未注册，进行提示
                // 2.手机未注册，进行提示
                // if (scope.loginUser.type === 'mobile')
                //   ctrl.$setValidity('mobilesole', false);
                // else
                //   ctrl.$setValidity('emailsole', false);
                ctrl.$setValidity('sole', false);
                ctrl.$showhint = true;
                iEle.addClass(FOCUS_CLASS);
              },
              function () {
                // 账号存在，可以登录
                ctrl.$setValidity('sole', true);
                ctrl.$showhint = true;
                iEle.removeClass(FOCUS_CLASS);
                ctrl.$valid = true;
              }
            );
      }
    });
  };

  fnCheckInput.password = function (scope, iEle, iAttrs, ctrl, isSubmit, passwordError) {
    // 分两种情况，1.控件失去焦点。2.提交表单。
    // 1.1.为空时，不进行验证，直接返回。
    // 1.2.不为空时，进行正则验证，并设置账号类型。
    // 1.2.1.正则未通过，显示错误。
    // 1.2.2.正则通过，不作操作。
    // 2.1.为空时，显示错误，并且返回。
    // 2.2.不为空时，进行正则验证。直接返回。
    // 2.3.正则通过，服务器返回密码错误时，显示错误提示。

    // 密码为空时的处理
    if (ctrl.$isEmpty(ctrl.$viewValue) && !isSubmit) {
      return;
    } else if (ctrl.$isEmpty(ctrl.$viewValue) && isSubmit) {
      // 同时是表单提交时：
      // 设置错误标示 empty
      // 显示提示
      // 添加焦点显示类
      ctrl.$setValidity('empty', false);
      ctrl.$showhint = true;
      iEle.addClass(FOCUS_CLASS);
      return;
    }

    // 密码格式是否正确
    var bFormat = fnPasswordFormat.password(ctrl.$viewValue);

    // 账号不为空时的处理
    if (!isSubmit) {
      // 非表单提交的处理
      scope.$apply(function () {
        ctrl.$setValidity('pattern', bFormat);
        if (!bFormat) {
          iEle.addClass(FOCUS_CLASS);
          ctrl.$showhint = true;
        }
      });
    } else {
      if (ctrl.$valid && passwordError) {
        ctrl.$setValidity('correct', false);
        ctrl.$showhint = true;
        iEle.addClass(FOCUS_CLASS);
      }
    }
  };

  /* 验证账号和密码的相关方法 */
  // 保存link函数的参数
  this.saveAccountArgs = function (args) {
    oArgs.account = args;
  };
  // 给模板实例（jqLite将checkFocus自定义指令所在的标签元素封装起来）绑定事件，进行相关验证。
  // 离开焦点的时候,进行相关规则的验证
  this.bindAccountEvt = function () {
    oArgs.account[1].bind('blur', this.checkAccountInput);
  };
  // 区分是否通过表单提交
  this.checkAccountInput = function (type) {
    console.log(type);
    // 设置表单提交的判断值
    var isSubmit = type === 'submit';
    // 检查输入字符是否符合账号格式规则
    fnCheckInput.account(oArgs.account[0], oArgs.account[1], oArgs.account[2], oArgs.account[3], isSubmit);
  };


  this.savePasswordArgs = function (args) {
    oArgs.password = args;
  };
  this.bindPasswordEvt = function () {
    oArgs.password[1].bind('blur', this.checkPasswordInput);
  };
  // 区分是否通过表单提交
  this.checkPasswordInput = function (type, error) {
    // 设置表单提交的判断值
    var isSubmit = type === 'submit';
    // 检查输入字符是否符合密码格式规则
    fnCheckInput.password(oArgs.password[0], oArgs.password[1], oArgs.password[2], oArgs.password[3], isSubmit, error);
  };
});
