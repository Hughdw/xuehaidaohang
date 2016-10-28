/**
 * require函数用来配置以及加载模块
 * 1.首先加载配置文件
 * 2.加载第三方库以及页面的程序文件
 * 3.加载共用文件
 ***bootstrap中有对页面的操作程序
 ***jquery必须在bootstrap之前引入
 */
require(['config'], function () {
  require(['jquery', 'bootstrap', 'course-list-main'], function () {
    require(['components/common']);
  });
});
