define(function (require) {
  var angular = require('angular');


  var app = angular.module('formApp',[]);
  // 总控制器
  app.controller('stepCtrl',function($scope) {
    // 接收
    $scope.$on('typeNext',function(event,step) {
      $scope.initStep = step;
    });

  });
  // 子控制器 - 密码找回方式选择
  app.controller('selectTypeCtrl',function($scope) {
    $scope.selectType =  {
      'mobile':{'steps':[0,1,2],'currentStep':0},
      'email':{'steps':[0,1,2],'currentStep':0},
      'currentType':'mobile'
    };

    $scope.activeBg = function(type) {
      return type === $scope.selectType.currentType ? 'active' : '';
      // body...
    };
  });
  // 子控制器 - 通过手机找回密码相关
  app.controller('mobileCtrl',function($scope) {

    // body...
  });

  angular.bootstrap(document,['formApp']);

});
