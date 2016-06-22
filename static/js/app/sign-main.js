angular.module('signApp',['ngRoute','formCheck','api'])
.config(function($routeProvider,$httpProvider) {
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
  $httpProvider.defaults.transformRequest = function(obj){
    var str = [];
    for(var p in obj){
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return str.join("&");
  };

  $httpProvider.defaults.headers.post = {
       'Content-Type': 'application/x-www-form-urlencoded'
  };
});
