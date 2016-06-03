define(function (require) {
  'use strict';
  var ngModule = require('../module/forgot-password-module');

  ngModule
  // constant() 方法总会在所有配置块之前被执行，可以将一个已经存在的变量值注册为服务，该服务可以注入到应用的其他部分使用
  // .facotry()
  .service('tempService',function($scope) {
    // body...
  })
  .constant('findTypeActiveClass','active')
  .constant('captchaURL','http://www.quick.com:8081/api/getCaptcha')
  .directive('ensureUnique', function($http) {
      return {
          require: 'ngModel',//依赖ngModel数据模型
          link: function(scope, ele, attrs, ctrl) {
              scope.$watch(attrs.ngModel, function(n) {
                // console.log(n);
                // console.log("scope:"+scope);
                // console.log("scope.ngModel:"+scope.ngModel);
                // console.log(attrs);
                // console.log(scope.ngModel);
                // console.log(attrs.ngModel);
                // console.log(scope.findFromMobile.captcha);
                // console.log(ctrl);
                  if (!n) return;
                  console.log(n);
                  // $.ajax({
                  //   url:'http://www.quick.com:8081/api/verifyCode',
                  //   type:'get',
                  //   data:{
                  //     captcha:n
                  //   },
                  //   success:function(json,XMLHttpRequest) {
                  //     console.log('XMLHttpRequest.status:'+XMLHttpRequest.status);
                  //     console.log('json.code:'+json.code);
                  //   },
                  //   error:function(XMLHttpRequest,textStatus,errorThrown) {
                  //     console.log(XMLHttpRequest.status);
                  //     console.log(textStatus);
                  //     console.log(errorThrown);
                  //     // body...
                  //   }
                  // });
                  $http({
                      method: 'get',
                      url: 'http://www.quick.com:8081/api/verifyCode',
                      params:{
                        captcha: scope.findFromMobile.captcha
                      }
                      // data: {
                      //     'captcha': scope.findFromMobile.captcha
                      // }
                  }).success(function(data,header) {
                    console.log(data.code);
                    // console.log(data);
                    // console.log(data.code);
                      ctrl.$setValidity('unique', data.isUnique);
                  }).error(function(data,header) {
                    console.log(data.code);
                    console.log(header);
                      ctrl.$setValidity('unique', false);
                  });
              });
          }
      };
  })
  // 总控制器
  .controller('stepCtrl',function($scope) {
    $scope.findTypeStep = {
      currentType:'findType',
      selectType:'mobile'
    };
    $scope.findFromMobile = {
      captcha:'',
      test:'12'
    };

  })
  // 子控制器 - 密码找回方式选择
  .controller('selectTypeCtrl',function($scope,findTypeActiveClass) {
    //切换 当前选择项样式 的行为
    $scope.getActiveClass = function(type) {
      return type === $scope.findTypeStep.selectType ? findTypeActiveClass : '';
    };
  })
  // 子控制器 - 通过手机找回密码相关
  .controller('mobileCtrl',function($scope,$http,captchaURL) {
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

    // 初始化 提示弹出框
    // $('[data-toggle="popover"]').popover()
    // 当前步骤
    $scope.mobileStep = 0;
    // 图片验证码
    $scope.getCaptcha = captchaURL;
    $scope.reloadCaptcha = function() {
      $scope.getCaptcha = captchaURL+'?v='+Math.random();
    };
    //
    // $scope.mobile



    // body...
  })
  // 子控制器 - 通过邮箱找回密码相关
  .controller('emailCtrl',function($scope) {
    $scope.emailStep = 1;
    // body...
  });

});
