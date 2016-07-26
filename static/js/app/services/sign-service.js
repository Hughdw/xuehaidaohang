angular.module('sign-service',[])
.constant('FOCUS_CLASS','ng-focused')
// 为自定义指令 和 表单提交 提供事件绑定、验证服务。
.service('submitForm',function(apiService,FOCUS_CLASS) {
  // 验证规则
  var fnAccountFormat = {
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
  // 储存通过参数传入的对象（socpe,iEle,iAttrs,ctrl）
  var _args = {
    account:'',
    password:''
  };
  // 检查输入的字符是否符合规则
  var _fnCheckInput = {};
  _fnCheckInput.account = function (scope, iEle, iAttrs, ctrl, isSubmit) {
    // 分两种情况，1.控件失去焦点。2.提交表单。
    // 1.1.为空时，不进行验证，直接返回。
    // 1.2.不为空时，进行正则验证，并设置账号类型。
    // 1.2.1.正则未通过，显示错误。
    // 1.2.2.正则通过，请求API。
    // 2.1.为空时，显示错误，并且返回。
    // 2.2.不为空时，进行正则验证，并设置账号类型。直接返回。
    if (ctrl.$isEmpty(ctrl.$viewValue) && !isSubmit) {
      return;
    } else if (ctrl.$isEmpty(ctrl.$viewValue) && isSubmit) {
      ctrl.$setValidity('empty', false);
      ctrl.$showhint = true;
      iEle.addClass(FOCUS_CLASS);
      return;
    }
    // 记录登录的账号类型
    if (fnAccountFormat.mobile(ctrl.$viewValue)) {
      scope.loginUser.type = 'mobile';
    } else if (fnAccountFormat.email(ctrl.$viewValue)) {
      scope.loginUser.type = 'email';
    } else {
      scope.loginUser.type = 'error';
    }
    var bFormat = scope.loginUser.type === 'error' ? false : true;
    ctrl.$accountType = scope.loginUser.type;
    // 提交表单时，返回当前控件是否已经验证通过。
    if (!isSubmit) {
      scope.$apply(function() {
        // 设置验证规则是否通过
        ctrl.$setValidity('pattern', bFormat);
        if (!bFormat) {
          // 设置文字提示为显示
          ctrl.$showhint = true;
          // 控制边框是否显示红色
          iEle.addClass(FOCUS_CLASS);
        } else {
          apiService.checkAccount(scope.loginUser.type,ctrl.$viewValue).then(
            function(seccess) {
              // 账号不存在，不能登录
              // 1.邮箱未注册，进行提示
              // 2.手机未注册，进行提示
              // if (scope.loginUser.type === 'mobile')
              //   ctrl.$setValidity('mobilesole', false);
              // else
              //   ctrl.$setValidity('emailsole', false);
              ctrl.$setValidity('sole',false);
              ctrl.$showhint = true;
              iEle.addClass(FOCUS_CLASS);
            },
            function(error) {
              // 账号存在，可以登录
              ctrl.$setValidity('sole',true);
              ctrl.$showhint = true;
              iEle.removeClass(FOCUS_CLASS);
              ctrl.$valid = true;
            }
          );
        }
      });
    } else {
      // 可以通过返回当前表单项的状态来控制是否用动画进行提示。
      if (ctrl.$valid) {
        return;
      }else{

        return;
      }
    }
  };
  // 分两种情况，1.控件失去焦点。2.提交表单。
  // 1.1.为空时，不进行验证，直接返回。
  // 1.2.不为空时，进行正则验证，并设置账号类型。
  // 1.2.1.正则未通过，显示错误。
  // 1.2.2.正则通过，不作操作。
  // 2.1.为空时，显示错误，并且返回。
  // 2.2.不为空时，进行正则验证。直接返回。
  // 2.3.正则通过，服务器返回密码错误时，显示错误提示。
  _fnCheckInput.password = function(scope, iEle, iAttrs, ctrl, isSubmit,passwordError) {
    if (ctrl.$isEmpty(ctrl.$viewValue) && !isSubmit) {
      return;
    } else if (ctrl.$isEmpty(ctrl.$viewValue) && isSubmit) {
      // 提交表单时，设置当前的空状态。
      ctrl.$setValidity('empty', false);
      ctrl.$showhint = true;
      iEle.addClass(FOCUS_CLASS);
      return;
    }
    var bFormat = fnPasswordFormat.password(ctrl.$viewValue);

    if (!isSubmit) {
      scope.$apply(function() {
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

  // 登录账号相关的方法
  this.saveAccountArgs = function(args) {
    _args.account = args;
  };
  this.bindAccountEvt = function() {
    // 给模板实例（jqLite将checkFocus自定义指令所在的标签元素封装起来）绑定事件，进行相关验证。
    // 1.离开焦点的时候,进行相关规则的验证
    // 2.1.验证结果不符合规则，则显示 边框提示 和显示 文字提示。
    _args.account[1].bind('blur',this.checkAccountInput);
  };
  this.checkAccountInput = function(type) {
    // 对提交表单操作进行标识
    var isSubmit = type === 'submit' ? true : false;
    // 执行服务中的 表单校验 函数
    _fnCheckInput.account(_args.account[0],_args.account[1],_args.account[2],_args.account[3],isSubmit);
  };

  // 密码相关的方法
  this.savePasswordArgs = function(args) {
    _args.password = args;
  };
  this.bindPasswordEvt = function() {
    _args.password[1].bind('blur',this.checkPasswordInput);
  };
  this.checkPasswordInput = function(type,error) {
    // 对提交表单操作进行标识
    var isSubmit = type === 'submit' ? true : false;
    _fnCheckInput.password(_args.password[0],_args.password[1],_args.password[2],_args.password[3],isSubmit,error);
  };
});
