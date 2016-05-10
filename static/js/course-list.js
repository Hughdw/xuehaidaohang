/**
 * requirejs函数用来配置以及加载模块
 * 1.首先加载配置文件
 * 2.指定页面的程序逻辑
 ***bootstrap中有对页面的操作程序
 ***jquery必须在bootstrap之前引入
 */
requirejs(['static/js/config.js'], function(config) {
  requirejs(['jquery','bootstrap','mod/set-min-height', 'app/course-list-main']);
});
