// 初期处于学习阶段，service factory directive controller 都写在一个页面中
define(function(require) {
  'use strict';
  var ngModule = require('../module/forgot-password-module');
// constant() 方法总会在所有配置块之前被执行，可以将一个已经存在的变量值注册为服务，该服务可以注入到应用的其他部分使用
  ngModule
  .factory('timer',function() {

  })
  .factory('apiURL', function() {
    var sHost = 'http://www.quick.com:8081';
    return {
      imgCaptcha:sHost + '/api/getCaptcha',
      mobileCode:sHost + '/api/sendMobileCode',
      mailCode:sHost + '/api/sendMailCode',
      verifyCode:sHost + '/api/verifyCode'
    };
  })
  .factory('CAPTCHAService', function($q, $http, apiURL) {
    var oService = {};
    var fnPretreatment = function(answer,deferred) {
      // 对后台返回的状态码做预处理
      // 200返回执行，401拒绝
      if (answer.data.code === 200) {
        answer.status = true;
        deferred.resolve(answer);
      } else if (answer.data.code === 401) {
        answer.status = false;
        deferred.reject(answer);
      }
    };

    oService.getImgCaptcha = function() {
      return apiURL.imgCaptcha + '?v=' + Math.random();
    };
    oService.getMobileCode = function(mobile) {
      var oDeferred = $q.defer();
      var oPromise = $http.get(apiURL.mobileCode,{
        params:{
          reg:0,
          mobile:mobile
        }
      });
      oPromise.then(
        function(answer) {
          fnPretreatment(answer,oDeferred);
        },
        function(error) {
          console.log(error);
          oDeferred.reject(error);
        }
      );
      return oDeferred.promise;
    };
    oService.getMailCode = function(email) {
      var oDeferred = $q.defer();
      var oPromise = $http.get(apiURL.mobileCode,{
        params:{
          reg:0,
          mobile:mobile
        }
      });
      oPromise.then(
        function(answer) {
          fnPretreatment(answer,oDeferred);
        },
        function(error) {
          console.log(error);
          oDeferred.reject(error);
        }
      );
      return oDeferred.promise;
    };
    oService.verifyCode = function(type,code) {
      var oVerifyType;
      switch (type) {
        case 'mobile':
          oVerifyType = {activationMobileCode:code};
          break;
        case 'mail':
          oVerifyType = {activationMailCode:code};
          break;
        default:
          oVerifyType = {captcha:code};
      }
      // 构建一个新的延迟实例
      var oDeferred = $q.defer();
      var oPromise = $http.get(apiURL.verifyCode,{
        params:oVerifyType
      });
      oPromise.then(
        function(answer) {
          fnPretreatment(answer,oDeferred);
        },
        function(error) {
          console.log(error);
          oDeferred.reject(error);
        }
      );
      // 与当前oDeferred有关的oPromise对象。
      return oDeferred.promise;
    };
    return oService;
  })

  // 为切换active类提供常量
  .constant('addActiveClass', 'active')
  // 通过请求API接口，验证输入的验证码是否正确
  .directive('ensureCorrect', function($rootScope, $http, CAPTCHAService) {
    return {
      //依赖ngModel数据模型
      require: 'ngModel',
      link: function(scope, iEle, iAttrs, ctrl) {
        // 监控属性mgModel是否发生变化
        // 问题：但是现在为什么只有当表单的验证规则通过后才会触发ngModel发生变化。
        // 回答：link函数中的controller会将$viewValue（视图值）通过验证函数（验证器生成的）的筛选，筛选通过后才会赋值给$modeValue（模型值），即ng-model，ng-model发生变化时$watch才能监控到并触发回调
        scope.$watch(iAttrs.ngModel, function(newValue,oldValue) {
          // 输入的验证码没有通过控制器验证时为undefined
          console.log(newValue);
          if (!newValue) {
            // 验证码格式不正确或者验证请求未返回时，隐藏提醒标识
            scope.mobileData.imgCaptchaCallback = false;
            return;
          }
          CAPTCHAService.verifyCode('img',ctrl.$viewValue).then(
            function(seccess) {
              // XHR请求成功后，显示提醒标示
              scope.mobileData.imgCaptchaCallback = true;
              ctrl.$setValidity('correct', true);
            },
            function(error) {
              // XHR请求成功后，显示提醒标示
              scope.mobileData.imgCaptchaCallback = true;
              ctrl.$setValidity('correct', false);
            }
          );
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
    //切换 当前选择项样式
    $scope.getActiveClass = function(type) {
      return type === $scope.findTypeStep.selectType ? addActiveClass : '';
    };
  })

  // 子控制器 - 通过手机找回密码相关
  .controller('mobileCtrl', function($scope, $http, $interval, addActiveClass, CAPTCHAService) {
    $scope.mobileData = {
      mobile:'',//记录用户输入的手机号码
      currentStep:0,//当前步骤
      imgCaptchaCallback:false// 记录 验证图片验证码的请求是否返回
    };
    // 获取验证码按钮 显示开关
    $scope.showBtn = true;
    // 获取验证码按钮 是否禁用
    $scope.btnDis = false;
    // 获取验证码按钮 文字
    $scope.btnTxt = '获取验证码';
    // 图片验证码
    $scope.getCaptcha = CAPTCHAService.getImgCaptcha();

    //切换 步骤样式
    $scope.getActiveClass = function(type) {
      return type === $scope.mobileData.currentStep ? addActiveClass : '';
    };

    // 刷新验证码
    $scope.reloadCaptcha = function() {
      $scope.getCaptcha = CAPTCHAService.getImgCaptcha();
    };
    // 获取短信验证码
    // 1.请求发送短信的借口
    // 2.表单校验输入的格式
    // 3.输入完成，点击提交按钮进行验证
    // 4.1.验证通过 按钮文字变为 下一步
    // 4.2.验证未通过 按钮文字还是 提交

    $scope.getMobileCode = function(mobile) {
      var nTotal = 30;
      var vCountDownId;
      $scope.btnDis = true;
      $scope.btnTxt = '正在发送';
      CAPTCHAService.getMobileCode(mobile).then(
        function(success) {
          $scope.showBtn = false;
          $scope.countDown = nTotal;
          vCountDownId = $interval(function() {
            console.log(nTotal);
            if (nTotal === 0) {
              $scope.btnDis = false;
              $scope.showBtn = true;
              $scope.btnTxt = '获取验证码';
            }
            $scope.countDown = nTotal;
            nTotal--;
          },1000,31);
        },
        function(error) {

        }
      );
    };

    // 测试相关变量控制
    $scope.mobileData.mobile = 13917232473;
    $scope.mobileData.currentStep = 1;
    $scope.testFn = function() {
      console.log($scope.mobileData.imgCaptchaCallback);
    };

  })

  // 子控制器 - 通过邮箱找回密码相关
  .controller('emailCtrl', function($scope) {
    $scope.emailStep = 1;
  });
});
