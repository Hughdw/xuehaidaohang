/**
 * @title RequireJS配置文件
 * @fileOverView 本文件用于配置RequireJS使用过程中的一些选项；
 * 定义基础根路径 baseUrl；
 * 指定第三方库；
 * 声明库之间的依赖关系，以保证顺序加载（jQuery 和 BootStrap）；
 * @author whdstyle@gmail.com
 */
require.config({
  baseUrl: './static/js/app', // 设置模块加载的基础路径
  paths: {// 指定不在baseUrl根目录的模块路径指向
    // 'handlebars': 'handlebars/4.0.5/handlebars.min',// 模板引擎，不用
    'device': '../libs/device/0.2.7/device.min',
    // 'less': 'less/1.7.0/less',//在线编译less，不用
    'jquery': '../libs/jquery/1.11.3/jquery',
    'jq-cookie': '../libs/jquery-cookie/2.1.2/js.cookie',
    'bootstrap': '../libs/bootstrap/bootstrap-3.3.5/dist/js/bootstrap',
    'angular': '../libs/angular/1.2.29/angular',
    'ngRoute': '../libs/angular-route/1.2.29/angular-route',
    'qcVideo': [
      '../libs/video/h5connect',
      'http://qzonestyle.gtimg.cn/open/qcloud/video/h5/h5connect'
    ],
    // 'app': '../static/js/app',
    // 'mod': '../static/js/app/components',
    // 'tpldata':'./app/data/template',
    'tpl': '../tpl',
    'ngMock': '../libs/angular-mocks'
  },
  shim: {
    'jq-cookie': {
      deps: ['jquery']
    },
    'bootstrap': {
      deps: ['jquery']// 声明模块之间的依赖
    },
    'qcVideo': {
      exports: 'qcVideo'
    }
    // 'angular': {
    //   exports: 'angular'// 声明不符合AMD规范模块的调用时名称
    // },
    // 'ngRoute': {
    //   deps: ['angular'],
    //   exports: 'ngRoute'
    // },
    // 'ngMock': {
    //   deps: ['angular'],
    //   exports: 'ngMock'
    // }
  }
    // deps:['bootstrap']//确保首先加载bootstrap
    // urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用。会在每个模块之后添加?bust=xxx
});
