angular.module('sign-service',[])
.constant('FOCUS_CLASS','ng-focused')
.service('submitForm',function(apiService,FOCUS_CLASS) {
  // 验证规则
  var fnUsernameFormat = {
    mobile:function(str) {
      var reg = /^(13|14|15|18|17)\d{9}$/;
      return reg.test(str);
    },
    email:function(str) {
      var reg = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+[-a-zA-Z0-9]*)+[a-zA-Z0-9]+$/;
      return reg.test(str);
    }
  };
  // 验证规则
  var fnPasswordFormat = {
    password:function(str) {
      var reg = /^[^\s]{6,15}$/;
      return reg.test(str);
    }
  };
  // 储存通过参数传入的对象
  var _args = {
    username:''
  };
  var fnCheckInput = {};
  fnCheckInput.username = function (scope, iEle, iAttrs, ctrl, isSubmit) {
    // 2.2.验证结果符合规则，则进行远程验证。
    // 2.2.1.成功，则隐藏 边框提示 和 显示成功提示。
    // 2.2.2.失败，则显示 边框提示 和 显示失败提示。
    if (ctrl.$isEmpty(ctrl.$viewValue) && !isSubmit) {
      return;
    } else if (ctrl.$isEmpty(ctrl.$viewValue) && isSubmit) {
      ctrl.$setValidity('empty',!isSubmit);
      ctrl.$showhint = true;
      iEle.addClass(FOCUS_CLASS);
      return false;
    }
    // 记录登录的账号类型
    if (fnUsernameFormat.mobile(ctrl.$viewValue)) {
      scope.loginData.usernameType = 'mobile';
    } else if (fnUsernameFormat.email(ctrl.$viewValue)) {
      scope.loginData.usernameType = 'email';
    } else {
      scope.loginData.usernameType = 'error';
    }
    var bFormat = scope.loginData.usernameType === 'error' ? false : true;
    // 提交表单时，返回当前控件是否已经验证通过。
    if (isSubmit) {
      if (ctrl.$valid) {
        return true;
      }else{
        // 验证未通过返回 false
        return false;
      }
    } else {
      scope.$apply(function() {
        // 设置验证规则是否通过
        ctrl.$setValidity('pattern', bFormat);
        if (!bFormat) {
          // 设置文字提示为显示
          ctrl.$showhint = true;
          // 控制边框是否显示红色
          iEle.addClass(FOCUS_CLASS);
        } else {
          apiService.checkUsername(scope.loginData.usernameType,ctrl.$viewValue).then(
            function(seccess) {
              // 账号不存在，不能登录
              // 1.邮箱未注册，进行提示
              // 2.手机未注册，进行提示
              if (scope.loginData.usernameType === 'mobile')
                ctrl.$setValidity('mobilesole', false);
              else
                ctrl.$setValidity('emailsole', false);

              ctrl.$showhint = true;
              iEle.addClass(FOCUS_CLASS);
            },
            function(error) {
              if (scope.loginData.usernameType === 'mobile')
                ctrl.$setValidity('mobilesole', true);
              else
                ctrl.$setValidity('emailsole', true);
              // 账号存在，可以登录
              ctrl.$showhint = true;
              iEle.removeClass(FOCUS_CLASS);
              ctrl.$valid = true;
            }
          );
        }
      });
    }
  };

  fnCheckInput.password = function(scope, iEle, iAttrs, ctrl, isSubmit) {
    if (ctrl.$isEmpty(ctrl.$viewValue) && !isSubmit) {
      return;
    } else if (ctrl.$isEmpty(ctrl.$viewValue) && isSubmit) {
      ctrl.$setValidity('empty',!isSubmit);
      ctrl.$showhint = true;
      iEle.addClass(FOCUS_CLASS);
      return false;
    }
    var bFormat = fnPasswordFormat.password(ctrl.$viewValue);
    // 提交表单时，返回当前控件是否已经验证通过。
    if (isSubmit) {
      if (ctrl.$valid) {
        return true;
      } else {
        return false;
      }
    } else {
      scope.$apply(function() {
        ctrl.$setValidity('pattern', bFormat);
        ctrl.$showhint = true;
        if (bFormat){
          iEle.removeClass(FOCUS_CLASS);
          ctrl.$valid = true;
        } else {
          iEle.addClass(FOCUS_CLASS);
        }
      });
    }
  };

  // 登录账号相关的方法
  this.saveUsernameArgs = function(args) {
    _args.username = args;
  };
  this.bindUsernameEvt = function() {
    // 给模板实例（jqLite将checkFocus自定义指令所在的标签元素封装起来）绑定事件，进行相关验证。
    // 1.离开焦点的时候,进行相关规则的验证
    // 2.1.验证结果不符合规则，则显示 边框提示 和显示 文字提示。
    _args.username[1].bind('blur',this.checkUsernameInput);
  };
  this.checkUsernameInput = function(type) {
    // 提交表单时，进行标识
    var isSubmit = type === 'submit' ? true : false;
    // 执行服务中的 表单校验 函数
    return fnCheckInput.username(_args.username[0],_args.username[1],_args.username[2],_args.username[3],isSubmit);
  };

  // 密码相关的方法
  this.savePasswordArgs = function(args) {
    _args.password = args;
  };
  this.bindPasswordEvt = function() {
    _args.password[1].bind('blur',this.checkPasswordInput);
  };
  this.checkPasswordInput = function(type) {
    var isSubmit = type === 'submit' ? true : false;
    return fnCheckInput.password(_args.password[0],_args.password[1],_args.password[2],_args.password[3],isSubmit);
  };
});
