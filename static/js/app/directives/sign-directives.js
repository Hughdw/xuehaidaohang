angular.module('formCheck', [])
.constant('FOCUS_CLASS','ng-focused')
.directive('checkText',function() {
  return {
    restrict: 'A',
    controller: function($scope) {
      this.isTrue = function() {
        return true;
      };
    }
  };
})
.directive('checkUsername',function(apiService,FOCUS_CLASS) {
  return {
    require: 'ngModel',
    link: function(scope, iEle, iAttrs, ctrl) {
      //
      scope.$watch(iAttrs.ngModel,function(oldValue,newValue) {
        if (oldValue !== newValue) {
          // 隐藏文字提示
          ctrl.$showhint = false;
          // 去除控件border的警示状态
          iEle.removeClass(FOCUS_CLASS);
        }
      });
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
      iEle.bind('blur',function(evt) {
        // 控件为空时，不进行相关验证。
        if (ctrl.$isEmpty(ctrl.$viewValue)) return;
        var bFormat = fnUsernameFormat.mobile(ctrl.$viewValue) || fnUsernameFormat.email(ctrl.$viewValue);

        // 控制边框是否显示红色
        iEle.addClass(FOCUS_CLASS);
        // 触发$digest循环，同步数据
        // 这里的$showhint需要手动与view中的数据同步
        scope.$apply(function() {
          if (!bFormat) {
            // 控制边框是否显示红色
            iEle.addClass(FOCUS_CLASS);
            // 设置文字提示为显示
            ctrl.$showhint = true;
          }
          // 设置验证规则是否通过
          ctrl.$setValidity('pattern', bFormat);
          // 规则验证通过后，请求服务器验证验证码是否正确
          if (!ctrl.$error.pattern) {
            apiService.checkUsername(iAttrs.checkCaptcha,ctrl.$modelValue).then(
              function(seccess) {
                // XHR请求成功后，显示提醒标示
                ctrl.$showhint = true;
                iEle.addClass(FOCUS_CLASS);
                ctrl.$setValidity('correct', false);
              },
              function(error) {
                // XHR请求成功后，显示提醒标示
                ctrl.$showhint = true;
                iEle.removeClass(FOCUS_CLASS);
                ctrl.$setValidity('correct', true);
                // angularJS的BUG，再验证错误一次后，再次验证成功，$error中的所有属性都为false的情况下 $valid没有更新为true
                ctrl.$valid = true;
              }
            );
          }
        });
      });
    }
  };
})
.directive('confirmPassword',function(FOCUS_CLASS) {
  return {
    require: 'ngModel',
    link: function(scope, iEle, iAttrs, ctrl) {
      // 通过监控ngModel，让输入框中的错误提示立马隐藏
      scope.$watch(iAttrs.ngModel,function(oldValue,newValue) {
        // 正在输入的时候去除提示
        // 1.去除错误的文字提示
        // 2.去除错误的边框提示
        if (oldValue !== newValue) {
          // 隐藏文字提示
          ctrl.$showhint = false;
          // 去除控件border的警示状态
          iEle.removeClass(FOCUS_CLASS);
        }
      });
      iEle.bind('blur',function(evt) {
        // 获取 $formController 表单控制器下的 密码框控制器（[iAttrs.confirmPassword]的值指向将要进行相等判断的password控件）
        var otherInput = iEle.inheritedData('$formController')[iAttrs.confirmPassword];
        var correct = ctrl.$viewValue === otherInput.$viewValue;
        // console.log(correct);
        if (correct) {
          iEle.removeClass(FOCUS_CLASS);
        } else {
          iEle.addClass(FOCUS_CLASS);
        }
        scope.$apply(function() {
          // 设置文字提示为显示
          ctrl.$showhint = true;
          // 设置验证规则是否通过
          ctrl.$setValidity('confirm', correct);
        });

        // 向密码输入框控制器的分析程序中加入一个验证函数
        // 函数用来实时判断密码输入框中的值与密码确认输入框中的值是否相等，并设置验证的状态
        otherInput.$parsers.push(function(value) {
          var status = value === ctrl.$viewValue;
          ctrl.$setValidity('confirm', status);
          if (status) {
            iEle.removeClass(FOCUS_CLASS);
          } else {
            iEle.addClass(FOCUS_CLASS);
          }
          // 设置文字提示为显示
          ctrl.$showhint = true;
          return value;
        });
      });
    }
  };
})
.directive('checkPassword',function(FOCUS_CLASS) {
  return {
    require: 'ngModel',
    link: function(scope, iEle, iAttrs, ctrl) {
      // 通过监控ngModel，让输入框中的错误提示立马隐藏
      scope.$watch(iAttrs.ngModel,function(oldValue,newValue) {
        // 正在输入的时候去除提示
        // 1.去除错误的文字提示
        // 2.去除错误的边框提示
        if (oldValue !== newValue) {
          // 隐藏文字提示
          ctrl.$showhint = false;
          // 去除控件border的警示状态
          iEle.removeClass(FOCUS_CLASS);
        }
      });
      // 验证规则
      var fnPasswordFormat = {
        password:function(str) {
          var reg = /^[^\s]{6,15}$/;
          return reg.test(str);
        }
      };

      // 给模板实例（jqLite将checkFocus自定义指令所在的标签元素封装起来）绑定事件，进行相关验证。
      // 1.离开焦点的时候,进行相关规则的验证
      // 2.验证结果不符合规则，则显示 边框提示 和对应的 文字提示。
      iEle.bind('blur',function(evt) {
        // 控件为空时，不进行相关验证。
        if (ctrl.$isEmpty(ctrl.$viewValue)) return;
        var bFormat = fnPasswordFormat.password(ctrl.$viewValue);
        if (bFormat){
          iEle.removeClass(FOCUS_CLASS);
        } else {
          iEle.addClass(FOCUS_CLASS);
        }
        // 触发$digest循环，同步数据
        // 这里的$showhint需要手动与view中的数据同步
        scope.$apply(function() {
          // 设置文字提示为显示
          ctrl.$showhint = true;
          // 设置验证规则是否通过
          ctrl.$setValidity('pattern', bFormat);
        });
      });
    }
  };

})
.directive('checkCaptcha', function(apiService,FOCUS_CLASS) {
  return {
    //依赖ngModel数据模型
    require: 'ngModel',
    link: function(scope, iEle, iAttrs, ctrl) {
      scope.$watch(iAttrs.ngModel, function(newValue, oldValue) {
        // 输入的验证码没有通过控制器验证时为undefined
        if (oldValue !== newValue) {
          // 删除$error中的远程验证标示
          delete ctrl.$error.correct;
          // 隐藏文字提示
          ctrl.$showhint = false;
          // 去除控件border的警示状态
          iEle.removeClass(FOCUS_CLASS);
        }
      });
      // 验证规则
      var fnCaptchaFormat = {
        mobile:function(str) {
          var reg = /^\d{4}$/;
          return reg.test(str);
        },
        mail:function(str) {
          var reg = /^\d{4}$/;
          return reg.test(str);
        },
        img:function(str) {
          var reg = /^\w{5}$/;
          return reg.test(str);
        }
      };
      iEle.bind('blur',function(evt) {
        // 控件为空时，不进行相关验证。
        if (ctrl.$isEmpty(ctrl.$viewValue)) return;
        var bFormat = fnCaptchaFormat[iAttrs.checkCaptcha](ctrl.$viewValue);
        // 控制边框是否显示红色
        iEle.addClass(FOCUS_CLASS);
        // 触发$digest循环，同步数据
        // 这里的$showhint需要手动与view中的数据同步
        scope.$apply(function() {
          if (!bFormat) {
            // 控制边框是否显示红色
            iEle.addClass(FOCUS_CLASS);
            // 设置文字提示为显示
            ctrl.$showhint = true;
          }
          // 设置验证规则是否通过
          ctrl.$setValidity('pattern', bFormat);
          // 规则验证通过后，请求服务器验证验证码是否正确
          if (!ctrl.$error.pattern) {
            apiService.verifyCode(iAttrs.checkCaptcha,ctrl.$modelValue).then(
              function(seccess) {
                // XHR请求成功后，显示提醒标示
                ctrl.$showhint = true;
                iEle.removeClass(FOCUS_CLASS);
                ctrl.$setValidity('correct', true);
                // angularJS的BUG，再验证错误一次后，再次验证成功，$error中的所有属性都为false的情况下 $valid没有更新为true
                ctrl.$valid = true;
              },
              function(error) {
                // XHR请求成功后，显示提醒标示
                ctrl.$showhint = true;
                iEle.addClass(FOCUS_CLASS);
                ctrl.$setValidity('correct', false);
              }
            );
          }
        });
      });
    }
  };
})
.directive('regUsername',function(apiService,FOCUS_CLASS) {
  return {
    require: 'ngModel',
    link: function(scope, iEle, iAttrs, ctrl) {
      // 通过监控ngModel，让输入框中的错误提示立马隐藏
      scope.$watch(iAttrs.ngModel,function(oldValue,newValue) {
        // 正在输入的时候去除提示
        // 1.去除错误的文字提示
        // 2.去除错误的边框提示
        if (oldValue !== newValue) {
          // 删除$error中的远程验证标示
          // delete ctrl.$error.sole;
          // 隐藏文字提示
          ctrl.$showhint = false;
          // 去除控件border的警示状态
          iEle.removeClass(FOCUS_CLASS);
        }
      });
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

      // 给模板实例（jqLite将checkFocus自定义指令所在的标签元素封装起来）绑定事件，进行相关验证。
      // 1.离开焦点的时候,进行相关规则的验证
      // 2.验证结果不符合规则，则显示 边框提示 和对应的 文字提示。
      iEle.bind('blur',function(evt) {
        // 控件为空时，不进行相关验证。
        if (ctrl.$isEmpty(ctrl.$viewValue)) return;
        var bFormat = fnUsernameFormat[iAttrs.regUsername](ctrl.$viewValue);
        // 触发$digest循环，同步数据
        // 这里的$showhint需要手动与view中的数据同步
        scope.$apply(function() {
          if (!bFormat) {
            // 控制边框是否显示红色
            iEle.addClass(FOCUS_CLASS);
            // 设置文字提示为显示
            ctrl.$showhint = true;
          }
          // 设置验证规则是否通过
          ctrl.$setValidity('pattern', bFormat);
          // 规则验证通过后，请求服务器验证账号是否存在
          if (!ctrl.$error.pattern) {
            // 通过ensure-correct属性值在verifyCode中进一步筛选请求的参数
            apiService.checkUsername( iAttrs.regUsername,ctrl.$modelValue).then(
              function(seccess) {
                // XHR请求成功后，显示提醒标示
                ctrl.$showhint = true;
                iEle.removeClass(FOCUS_CLASS);
                ctrl.$setValidity('sole', true);
                ctrl.$valid = true;
              },
              function(error) {
                // XHR请求成功后，显示提醒标示
                ctrl.$showhint = true;
                iEle.addClass(FOCUS_CLASS);
                ctrl.$setValidity('sole', false);
              }
            );
          }
        });
      });
    }
  };
})
