// angular route配置
angular.module('findPDApp',['ngRoute','formCheck','api'])
.config(function($routeProvider) {
  $routeProvider
  .when('/findType',{
    templateUrl:'./views/forgotpassword/findType.html'
  })
  .when('/mobile',{
    templateUrl:'./views/forgotpassword/mobile.html?bust='+ (new Date()).getTime()
  })
  .when('/email',{
    templateUrl:'./views/forgotpassword/email.html'
  })
  .otherwise({
    templateUrl:'./views/forgotpassword/findType.html'
  });
});
