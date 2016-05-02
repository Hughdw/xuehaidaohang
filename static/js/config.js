/**
 * 定义 基础根路径 baseUrl
 * 指定第三方库 和 项目JS模块的根目录（app）
 * 声明库的依赖关系，以保证顺序加载
 */
requirejs.config({
    baseUrl: 'lib',//设置模块加载的基础路径
    paths: {//指定不在baseUrl根目录的模块路径指向
        'device': 'device/0.2.7/device.min',
        'less': 'less/1.7.0/less',
        'jquery': 'jquery/1.11.3/jquery.min',
        'bootstrap': 'bootstrap/bootstrap-3.3.5/dist/js/bootstrap',
        'app': '../static/js/app',
        'mod': '../static/js/app/model'
    },
    shim: {//声明模块之间的依赖
      'bootstrap':['jquery']
    }
});















//
