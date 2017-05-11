/**
 * @title 手动启动 angular 应用
 * @fileOverView 转向纯angular应用，此页面暂时无用
 * @author whdstyle@gmail.com
 */
require(['config'], function (config) {
  require([
    'jquery',
    'bootstrap',
    'route/forgot-password-route',
    'controllers/forgot-password-ctrl',
    'forgot-password-main'
  ], function () {

  });
});
