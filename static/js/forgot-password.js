require(['config'], function(config) {
  require([
    'jquery',
    'bootstrap',
    'app/route/forgot-password-route',
    'app/controllers/forgot-password-ctrl',
    'app/forgot-password-main'
  ],function() {
    // 手动启动 angular 应用
    angular.bootstrap(document,['findPDApp']);
  });
});
