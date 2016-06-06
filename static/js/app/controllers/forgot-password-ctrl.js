define(function(require) {
  'use strict';
  var ngModule = require('../module/forgot-password-module');

  ngModule
  // constant() 方法总会在所有配置块之前被执行，可以将一个已经存在的变量值注册为服务，该服务可以注入到应用的其他部分使用
  // .facotry()
    .service('tempService', function($scope) {
      // body...
    })
    .constant('findTypeActiveClass', 'active')
    .value('mobileStatus',{
      mobile:'',
      step:0,
      captchaFirstCallback:false
    })
    .constant('captchaURL', 'http://www.quick.com:8081/api/getCaptcha')
    .directive('ensureCorrect', function($rootScope,$http,mobileStatus) {
      return {
        //依赖ngModel数据模型
        require: 'ngModel',
        link: function(scope, iEle, iAttrs, ctrl) {

          // 监控属性mgModel是否发生变化
          // 问题：但是现在为什么只有当表单的验证规则通过后才会触发ngModel发生变化。
          // 回答：link函数中的controller会将$viewValue（视图值）通过验证函数（验证器生成的）的筛选，筛选通过后才会赋值给$modeValue（模型值），即ng-model，ng-model发生变化时$watch才能监控到并触发回调
          scope.$watch(iAttrs.ngModel, function(newValue,oldValue) {
            // console.log(scope.findFromMobile.mobile);

            // if (!mobileForm_0.mobile.$valid) {
            //   console.log(mobileForm_0.mobile.$dirty+'_1');
            //   console.log(mobileForm_0.mobile.$pristine+'_2');
            //   // mobileForm_0.mobile.$dirty = true;
            //   // mobileForm_0.mobile.$error.required = true;
            //   return;
            // }
            if (!newValue) return;
            $http({
              method: 'get',
              url: 'http://www.quick.com:8081/api/verifyCode',
              params: {
                captcha: ctrl.$viewValue
              }
            }).success(function(data) {
              mobileStatus.captchaFirstCallback = true;
              console.log(mobileStatus.captchaFirstCallback+'1');
              if (data.code === 200) {
                // data.status = true;
                // console.log(data.code);
                ctrl.$setValidity('correct', true);
                // console.log(ctrl);
                // console.log(data.code);
              } else if (data.code === 401) {
                console.log(data.code);
                console.log(ctrl);
                ctrl.$setValidity('correct', false);
                console.log(ctrl);
                // console.log(data.code);
              }


              // console.log(ctrl);
            }).error(function(data) {
              console.log('error:' + data.code);
              // ctrl.$setValidity('correct', false);
            });
          });
        }
      };
    })
    // 总控制器
    .controller('appCtrl', function($scope) {
      $scope.findTypeStep = {
        currentType: 'findType',
        selectType: 'mobile'
      };

    })
    // 子控制器 - 密码找回方式选择
    .controller('selectTypeCtrl', function($scope, findTypeActiveClass) {
      //切换 当前选择项样式 的行为
      $scope.getActiveClass = function(type) {
        return type === $scope.findTypeStep.selectType ? findTypeActiveClass : '';
      };
    })
    // 子控制器 - 通过手机找回密码相关
    .controller('mobileCtrl', function($scope,$rootScope, $http, captchaURL,mobileStatus) {
      // 接收事件
      // $scope.$on('typeNext',function(event,step) {
      //   $scope.findTypeStep.currentType = step;
      // });
      //

      // $scope.getCaptcha = function() {
      //   $http({
      //     method:'GET',
      //     url:'http://www.quick.com:8081/api/getCaptcha'
      //   });
      // };
      $scope.$watch(mobileStatus,function(n,o) {
        console.log('$watch run');
        $scope.captchaFirstCallback = mobileStatus.captchaFirstCallback;
        // body...
      },true);
      console.log(mobileStatus.captchaFirstCallback+'2');
      // 记录手机号码
      mobileStatus.mobile = $scope.mobile;
      // 记录步骤
      $scope.mobileStep = mobileStatus.step;
      $scope.testFn = function() {
        // body...
      }
      // 初始化 提示弹出框
      // $('[data-toggle="popover"]').popover()
      // 当前步骤
      // 图片验证码
      $scope.getCaptcha = captchaURL;
      $scope.reloadCaptcha = function() {
        $scope.getCaptcha = captchaURL + '?v=' + Math.random();
      };
      //
      // $scope.mobile



      // body...
    })
    // 子控制器 - 通过邮箱找回密码相关
    .controller('emailCtrl', function($scope) {
      $scope.emailStep = 1;
      // body...
    });

});
