define(function (require) {
  var $ = require('jquery'),
      angular = require('angular');
  $(function() {
    var app = angular.module('formApp',[]);
    app.controller('stepCtrl',function($scope) {
      // $scope.step
    });
    app.controller('selectCtrl',function($scope) {
      $scope.stepInit = {};
      $scope.stepInit.findType = 'mobile';
      $scope.stepInit.mobileBg = 'active';
      $scope.selectMobile = function () {
        $scope.stepInit.emailBg = '';
        $scope.stepInit.mobileBg = 'active';
      };
      $scope.selectEmail = function () {
        $scope.stepInit.emailBg = 'active';
        $scope.stepInit.mobileBg = '';
      };
      $scope.stepInit = function() {

      };
    });
    angular.bootstrap(document,['formApp']);
  });
});
