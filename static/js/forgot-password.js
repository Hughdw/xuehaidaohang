require(['static/js/config.js'], function(config) {
  require([
    'jquery',
    'bootstrap',
    'angular',
    'app/route/forgot-password-route',
    'app/controllers/forgot-password-ctrl',
    'app/forgot-password-main'
  ],function($) {
    angular.element(document).ready(function() {
      // 手动启动 angular 应用
      angular.bootstrap(document,['findPDApp']);
    });
  });
});
