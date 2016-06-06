/**
 * 定义 基础根路径 baseUrl
 * 指定第三方库 和 项目JS模块的根目录（app）
 * 声明库的依赖关系，以保证顺序加载
 */
require.config({
    baseUrl: 'lib',//设置模块加载的基础路径
    paths: {//指定不在baseUrl根目录的模块路径指向
      'handlebars': 'handlebars/4.0.5/handlebars.min',// 模板引擎，不用
      'device': 'device/0.2.7/device.min',
      'less': 'less/1.7.0/less',
      'jquery': 'jquery/1.11.3/jquery.min',
      'bootstrap': 'bootstrap/bootstrap-3.3.5/dist/js/bootstrap.min',
      'angular': 'angular/1.2.29/angular',
      'ngRoute':'angular-route/1.2.29/angular-route',
      'app': '../static/js/app',
      'mod': '../static/js/app/components',
      'tpldata':'../static/js/app/data/template',
      'tpl':'../static/tpl'
    },
    shim: {
      'bootstrap':{
        deps:['jquery']//声明模块之间的依赖
      },
      'angular':{
        exports:'angular'//声明不符合AMD规范模块的调用时名称
      },
      'ngRoute':{
        deps:['angular'],
        exports:'ngRoute'
      },
      'app':{
        deps:['angular']
      }
    },
    deps:['bootstrap'],//确保首先加载bootstrap
    urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
});















//
