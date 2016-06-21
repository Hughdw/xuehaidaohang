angular.module('signApp')
.constant('addActiveClass','active')
.controller('registerCtrl',function($scope,addActiveClass) {
  // body...
  var regData = $scope.regData = {
    currentTab : 0,
    status : 0
  };
  var user = $scope.user = {
    username:'',
    password:'',
    repassword:''
  };
  // 切换标签的当前选择样式
  regData.getActiveClass = function(num) {
    // body...
    return num === regData.currentTab ? addActiveClass : '';
  };
  // 切换 标签页内容的方法
  regData.switchTab = function(num) {
    // body...
    regData.currentTab = num;
  };

  // 测试
  regData.consoleInfo = function() {
    console.log($scope.mobileForm.mobile.$error.pattern);
  };

});
