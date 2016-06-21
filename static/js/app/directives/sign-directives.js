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
.directive('checkSms', function(apiService,FOCUS_CLASS) {
  return {
    //依赖ngModel数据模型
    require: 'ngModel',
    link: function(scope, iEle, iAttrs, ctrl) {
      //
      scope.$watch(iAttrs.ngModel, function(newValue, oldValue) {
        // console.log(ctrl);
        // 输入的验证码没有通过控制器验证时为undefined
        if (oldValue !== newValue) {
          // 隐藏文字提示
          ctrl.$showhint = false;
          // 去除控件border的警示状态
          iEle.removeClass(FOCUS_CLASS);
        }
      });
      // 验证规则
      var fnSmsFormat = function(str) {
        var reg = /[0-9]{4}/;
        return reg.test(str);
      };

      iEle.bind('blur',function(evt) {
        // 控件为空时，不进行相关验证。
        if (ctrl.$isEmpty(ctrl.$viewValue)) return;
        // 控制边框是否显示红色
        iEle.addClass(FOCUS_CLASS);
        // 触发$digest循环，同步数据
        scope.$apply(function() {
          // 设置文字提示为显示
          ctrl.$showhint = true;
          // 设置验证规则是否通过
          ctrl.$setValidity('pattern', fnSmsFormat(ctrl.$viewValue));
          // 规则验证通过后，请求服务器验证验证码是否正确
          if (ctrl.$valid) {
            apiService.verifyCode(iAttrs.checkSms,ctrl.$modelValue).then(
              function(seccess) {
                // XHR请求成功后，显示提醒标示
                ctrl.$showhint = true;
                ctrl.$setValidity('correct', true);
              },
              function(error) {
                // XHR请求成功后，显示提醒标示
                ctrl.$showhint = true;
                ctrl.$setValidity('correct', false);
              }
            );
          }
        });
      });
    }
  };
})
.directive('regMobile',function(apiService,FOCUS_CLASS) {
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
      var fnMobileFormat = function(str) {
        var reg = /^(13|14|15|18)\d{9}$/;
        return reg.test(str);
      };

      // 给模板实例（jqLite将checkFocus自定义指令所在的标签元素封装起来）绑定事件，进行相关验证。
      // 1.离开焦点的时候,进行相关规则的验证
      // 2.验证结果不符合规则，则显示 边框提示 和对应的 文字提示。
      iEle.bind('blur',function(evt) {
        // 控件为空时，不进行相关验证。
        if (ctrl.$isEmpty(ctrl.$viewValue)) return;
        // 控制边框是否显示红色
        iEle.addClass(FOCUS_CLASS);
        // 触发$digest循环，同步数据
        scope.$apply(function() {
          // 设置文字提示为显示
          ctrl.$showhint = true;
          // 设置验证规则是否通过
          ctrl.$setValidity('pattern', fnMobileFormat(ctrl.$viewValue));
          // 规则验证通过后，请求服务器验证账号是否存在
          if (ctrl.$valid) {
            // 通过ensure-correct属性值在verifyCode中进一步筛选请求的参数
            apiService.checkUsername( ctrl.$modelValue).then(
              function(seccess) {
                // XHR请求成功后，显示提醒标示
                ctrl.$showhint = true;
                ctrl.$setValidity('sole', true);
              },
              function(error) {
                // XHR请求成功后，显示提醒标示
                ctrl.$showhint = true;
                ctrl.$setValidity('sole', false);
              }
            );
          }
        });

      });
    }
  };
})
