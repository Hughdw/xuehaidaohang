define(function (require) {
  var ngModule = require('../module/forgot-password-module');
  // constant() 方法总会在所有配置块之前被执行，可以将一个已经存在的变量值注册为服务，该服务可以注入到应用的其他部分使用
  ngModule.constant('findTypeActiveClass','active')
  // 总控制器
  .controller('stepCtrl',function($scope) {
    $scope.findTypeStep =  {
      currentType:'findType',
      selectType:'mobile'
    };

  })
  // 子控制器 - 密码找回方式选择
  .controller('selectTypeCtrl',function($scope,findTypeActiveClass) {
    $scope.getActiveClass = function(type) {
      return type === $scope.findTypeStep.selectType ? findTypeActiveClass : '';
    };
    // 接收事件
    $scope.$on('typeNext',function(event,step) {
      $scope.findTypeStep.currentType = step;
    });

  })
  // 子控制器 - 通过手机找回密码相关
  .controller('mobileCtrl',function($scope) {
    $scope.mobileStep = 1;
    // body...
  });

});
