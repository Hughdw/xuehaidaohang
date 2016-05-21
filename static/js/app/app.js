define(function (require) {
  var app = angular.module('myApp',[]);
  app.controller('selectCtrl',function($scope) {
    $scope.mobileType = 'checked';
    // body...
  });
  return app;
});
