define(function(require) {
  'use strict';
  var ngModule = require('../module/forgot-password-module');

  ngModule
  // constant() 方法总会在所有配置块之前被执行，可以将一个已经存在的变量值注册为服务，该服务可以注入到应用的其他部分使用
  .service('tempService', function($scope) {
    // body...
  })
  .factory('apiURL', function() {
    // body...
    var host = 'http://www.quick.com:8081';
    return {
      getImgCaptcha:host + '/api/getCaptcha',
      getMobileCode:host + '/api/sendMobileCode',
      getMailCode:host + '/api/sendMailCode',
      verifyCode:host + '/api/verifyCode'
    };
  })
  .constant('addActiveClass', 'active')
  .directive('ensureCorrect', function($rootScope,$http,apiURL) {
    return {
      //依赖ngModel数据模型
      require: 'ngModel',
      link: function(scope, iEle, iAttrs, ctrl) {
        // 监控属性mgModel是否发生变化
        // 问题：但是现在为什么只有当表单的验证规则通过后才会触发ngModel发生变化。
        // 回答：link函数中的controller会将$viewValue（视图值）通过验证函数（验证器生成的）的筛选，筛选通过后才会赋值给$modeValue（模型值），即ng-model，ng-model发生变化时$watch才能监控到并触发回调
        scope.$watch(iAttrs.ngModel, function(newValue,oldValue) {
          // if (!mobileForm_0.mobile.$valid) {
          //   console.log(mobileForm_0.mobile.$dirty+'_1');
          //   console.log(mobileForm_0.mobile.$pristine+'_2');
          //   // mobileForm_0.mobile.$dirty = true;
          //   // mobileForm_0.mobile.$error.required = true;
          //   return;
          // }
          // 输入的验证码没有通过控制器验证时为undefined
          if (!newValue) {
            // 验证码格式不正确或者验证请求未返回时，隐藏错误标识
            scope.mobileData.imgCaptchaCallback = false;
            return;
          }
          $http({
            method: 'get',
            url: apiURL.verifyCode,
            params: {
              captcha: ctrl.$viewValue
            }
          }).success(function(data) {
            // body...
            // 第一次验证图片验证码，
            scope.mobileData.imgCaptchaCallback = true;
            if (data.code === 200) {
              ctrl.$setValidity('correct', true);
            } else if (data.code === 401) {
              ctrl.$setValidity('correct', false);
            }
          }).error(function(data) {
            console.log('error:' + data.code);
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
  .controller('selectTypeCtrl', function($scope, addActiveClass) {
    //切换 当前选择项样式 的行为
    $scope.getActiveClass = function(type) {
      return type === $scope.findTypeStep.selectType ? addActiveClass : '';
    };
  })

  // 子控制器 - 通过手机找回密码相关
  .controller('mobileCtrl', function($scope, addActiveClass, apiURL) {
    $scope.mobileData = {
      mobile:'',//记录用户输入的手机号码
      currentStep:0,//当前步骤
      imgCaptchaCallback:false// 记录图片验证码HTTP第一次返回
    };

    //切换 当前选择项样式 的行为
    $scope.getActiveClass = function(type) {
      return type === $scope.mobileData.currentStep ? addActiveClass : '';
    };

    // 图片验证码
    $scope.getCaptcha = apiURL.getImgCaptcha;
    // 刷新验证码
    $scope.reloadCaptcha = function() {
      $scope.getCaptcha = apiURL.getImgCaptcha + '?v=' + Math.random();
    };

    // 测试
    $scope.mobileData.mobile = 13917232473;
    $scope.mobileData.currentStep = 1;
    $scope.testFn = function() {
      console.log($scope.mobileData.imgCaptchaCallback);
      // body...
    };


  })

  // 子控制器 - 通过邮箱找回密码相关
  .controller('emailCtrl', function($scope) {
    // body...
    $scope.emailStep = 1;
  });
});
