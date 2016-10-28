/**
 * 表单验证指令 模块
 * 1.检查账号输入
 * 2.检查密码
 */
angular.module('formCheck', [])
/* 检查输入账号是否合法（格式、是否已注册） */
.directive('checkAccount', function (FOCUS_CLASS, submitForm) {
  return {
    require: 'ngModel',
    link: function (scope, iEle, iAttrs, ctrl) {
      scope.$watch(iAttrs.ngModel, function (oldValue, newValue) {
        // 通过监控ngModel，当输入框中的文本发生变化时，错误提示立马隐藏
        // 1.关闭文字提示
        // 2.关闭边框提示
        // 3.关闭规则错误标示
        if (oldValue !== newValue) {
          ctrl.$showhint = false;
          ctrl.$setValidity('empty', true);
          ctrl.$setValidity('pattern', true);
          ctrl.$setValidity('sole', true);
          iEle.removeClass(FOCUS_CLASS);
        }
      });

      // 1.将link函数的参数传入服务中
      // 2.绑定相关验证的事件
      submitForm.saveAccountArgs(arguments);
      submitForm.bindAccountEvt();
    }
  };
})
/* 检查输入密码是否合法 */
.directive('checkPassword', function (FOCUS_CLASS, submitForm) {
  return {
    require: 'ngModel',
    link: function (scope, iEle, iAttrs, ctrl) {
      scope.$watch(iAttrs.ngModel, function (oldValue, newValue) {
        // 通过监控ngModel，当输入框中的文本发生变化时，错误提示立马隐藏
        // 1.关闭文字提示
        // 2.关闭边框提示
        // 3.关闭规则错误标示
        if (oldValue !== newValue) {
          ctrl.$showhint = false;
          ctrl.$setValidity('empty', true);
          ctrl.$setValidity('pattern', true);
          ctrl.$setValidity('correct', true);
          iEle.removeClass(FOCUS_CLASS);
        }
      });

      // 1.将link函数的参数传入服务中
      // 2.绑定相关验证的事件
      submitForm.savePasswordArgs(arguments);
      submitForm.bindPasswordEvt();
    }
  };
})
/* 检查输入重复密码是否合法 */
.directive('confirmPassword', function (FOCUS_CLASS) {
  return {
    require: 'ngModel',
    link: function (scope, iEle, iAttrs, ctrl) {
      scope.$watch(iAttrs.ngModel, function (oldValue, newValue) {
        // 通过监控ngModel，当输入框中的文本发生变化时，错误提示立马隐藏
        // 1.关闭文字提示
        // 2.关闭边框提示
        // 3.关闭规则错误标示
        if (oldValue !== newValue) {
          ctrl.$showhint = false;
          iEle.removeClass(FOCUS_CLASS);
        }
      });
      iEle.bind('blur', function (evt) {
        // 获取 $formController 表单控制器下的 密码框控制器（[iAttrs.confirmPassword]的值指向将要进行相等判断的password控件）
        var otherInput = iEle.inheritedData('$formController')[iAttrs.confirmPassword];
        var correct = ctrl.$viewValue === otherInput.$viewValue;
        scope.$apply(function () {
          ctrl.$setValidity('confirm', correct);
          ctrl.$showhint = true;
          if (correct) {
            iEle.removeClass(FOCUS_CLASS);
          } else {
            iEle.addClass(FOCUS_CLASS);
          }
        });

        // 向密码输入框控制器的分析程序中加入一个验证函数
        // 函数用来实时判断密码输入框中的值与密码确认输入框中的值是否相等，并设置验证的状态
        otherInput.$parsers.push(function (value) {
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
/* 检查输入验证码是否合法 */
.directive('checkCaptcha', function (apiService, FOCUS_CLASS) {
  return {
    require: 'ngModel',
    link: function (scope, iEle, iAttrs, ctrl) {
      scope.$watch(iAttrs.ngModel, function (newValue, oldValue) {
        // 通过监控ngModel，当输入框中的文本发生变化时，错误提示立马隐藏
        // 1.关闭文字提示
        // 2.关闭边框提示
        // 3.关闭规则错误标示
        if (oldValue !== newValue) {
          ctrl.$setValidity('correct', true);
          ctrl.$showhint = false;
          iEle.removeClass(FOCUS_CLASS);
        }
      });
      // 验证规则
      var fnCaptchaFormat = {
        mobile: function (str) {
          var reg = /^\d{4}$/;
          return reg.test(str);
        },
        email: function (str) {
          var reg = /^\d{4}$/;
          return reg.test(str);
        },
        img: function (str) {
          var reg = /^\w{5}$/;
          return reg.test(str);
        }
      };
      // 给模板实例（jqLite将checkFocus自定义指令所在的标签元素封装起来）绑定事件，进行相关验证。
      // 1.离开焦点的时候,进行相关规则的验证
      // 2.1.验证结果不符合规则，则显示 边框提示 和显示 文字提示。
      // 2.2.验证结果符合规则，则进行远程验证。
      // 2.2.1.成功，则隐藏 边框提示 和 显示成功提示。
      // 2.2.2.失败，则显示 边框提示 和 显示失败提示。
      iEle.bind('blur', function (evt) {
        if (ctrl.$isEmpty(ctrl.$viewValue)) return;
        var bFormat = fnCaptchaFormat[iAttrs.checkCaptcha](ctrl.$viewValue);
        scope.$apply(function () {
          ctrl.$setValidity('pattern', bFormat);
          if (!bFormat) {
            ctrl.$showhint = true;
            iEle.addClass(FOCUS_CLASS);
          } else {
            // console.log(scope.regData);
            console.log(scope.user);
            apiService.verifyCode(iAttrs.checkCaptcha, ctrl.$viewValue, scope.user.account, scope.user.accountType).then(
              function (seccess) {
                ctrl.$showhint = true;
                ctrl.$setValidity('correct', true);
                iEle.removeClass(FOCUS_CLASS);
              },
              function (error) {
                ctrl.$showhint = true;
                ctrl.$setValidity('correct', false);
                iEle.addClass(FOCUS_CLASS);
              }
            );
          }
        });
      });
    }
  };
})
/* 检查注册时，输入账号是否合法 */
.directive('regAccount', function (apiService, FOCUS_CLASS) {
  return {
    // 依赖ngModel数据模型
    require: 'ngModel',
    link: function (scope, iEle, iAttrs, ctrl) {
      scope.$watch(iAttrs.ngModel, function (oldValue, newValue) {
        // 通过监控ngModel，当输入框中的文本发生变化时，错误提示立马隐藏
        // 1.关闭文字提示
        // 2.关闭边框提示
        // 3.关闭规则错误标示
        if (oldValue !== newValue) {
          // 删除$error中的远程验证标示，防止提示重叠
          ctrl.$setValidity('sole', true);
          // 隐藏提示
          ctrl.$showhint = false;
          // 去除控件border的警示状态
          iEle.removeClass(FOCUS_CLASS);
        }
      });
      // 验证规则
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

      // 给模板实例（jqLite将checkFocus自定义指令所在的标签元素封装起来）绑定事件，进行相关验证。
      // 1.离开焦点的时候,进行相关规则的验证
      // 2.1.验证结果不符合规则，则显示 边框提示 和显示 文字提示。
      // 2.2.验证结果符合规则，则进行远程验证。
      // 2.2.1.成功，则隐藏 边框提示 和 显示成功提示。
      // 2.2.2.失败，则显示 边框提示 和 显示失败提示。
      iEle.bind('blur', function (evt) {
        // 控件为空时，不进行相关验证。
        if (ctrl.$isEmpty(ctrl.$viewValue)) return;
        // 记录输入是否通过正则验证
        var bFormat = fnAccountFormat[iAttrs.regAccount](ctrl.$viewValue);
        // 触发$digest循环，同步数据
        // 这里的$showhint需要手动与view中的数据同步
        scope.$apply(function () {
          // 设置验证规则是否通过标示
          ctrl.$setValidity('pattern', bFormat);
          if (!bFormat) {
            // 没有通过正则验证
            // 显示提示
            ctrl.$showhint = true;
            // 添加提醒样式
            iEle.addClass(FOCUS_CLASS);
          } else {
            // 通过正则验证，请求远程服务器，验证账号是否存在。
            apiService.checkAccount(iAttrs.regAccount, ctrl.$viewValue).then(
              function (seccess) {
                // 显示提示
                // 多个地方分别设置$showhint是为了跟响应同步
                ctrl.$showhint = true;
                // 设置成功标示
                ctrl.$setValidity('sole', true);
                // 移除提醒样式
                iEle.removeClass(FOCUS_CLASS);
                // angularJS的BUG，再验证错误一次后，再次验证成功，$error中的所有属性都为false的情况下 $valid没有更新为true
                // 有可能是由于使用delete导致的BUG
                // ctrl.$valid = true;
              },
              function (error) {
                // 显示提示
                ctrl.$showhint = true;
                // 设置失败标示
                ctrl.$setValidity('sole', false);
                // 添加提醒样式
                iEle.addClass(FOCUS_CLASS);
              }
            );
          }
        });
      });
    }
  };
});
