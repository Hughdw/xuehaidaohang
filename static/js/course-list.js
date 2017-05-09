/**
 * @title 页面配置文件
 * @fileOverView 本文件用于页面加载模块的配置；
 * bootstrap依赖于jquery，已经在config中进行了对应的配置；
 * common模块存放所有页面的共同功能，例如，导航等；
 * 注意事项，在同一个require中加载的模块是异步的，不同require按照层级顺序从外向里同步加载对应的模块。因此顺序会是这样：config > jquery & bootstrap & page-js > common。
 * @author whdstyle@gmail.com
 */
require(['config'], function () {
  require(['jquery', 'bootstrap', 'course-list-main'], function () {
    require(['common']);
  });
});
