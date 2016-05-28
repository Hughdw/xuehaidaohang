require(['static/js/config.js'], function(config) {
  require([
    'jquery',
    'bootstrap',
    'app/route/forgot-password-route',
    'app/controllers/forgot-password-ctrl',
    'app/forgot-password-main'
  ],function() {
    //
    angular.bootstrap(document,['findPDApp']);
  });
});
