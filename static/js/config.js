/**
 * 定义 基础根路径 baseUrl
 * 指定第三方库 和 项目JS模块的根目录（app）
 * 声明库的依赖关系，以保证顺序加载
 */
requirejs.config({
    baseUrl: 'lib',
    paths: {
        'jquery': 'jquery/1.11.3/jquery.min',
        'bootstrap': 'bootstrap/bootstrap-3.3.5/dist/js/bootstrap',
        'app': '../static/js/app'
    },
    shim: {
        'bootstrap':{
            deps:['jquery'],
            exports:'Bootstrap'
        }
    }
});
