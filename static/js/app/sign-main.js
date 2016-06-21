angular.module('signApp',['ngRoute','formCheck','api'])
.config(function($routeProvider) {
  $routeProvider
  .when('/login',{
    templateUrl:'./views/sign/login.html'
  })
  .when('/register',{
    templateUrl:'./views/sign/register.html'
  })
  .otherwise({
    templateUrl:'./views/sign/login.html'
  });
});
