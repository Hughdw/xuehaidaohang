/**
 * Created by Hugh on 2016/3/25.
 * 首先加载配置文件
 * 配置文件加在完毕后，指定页面需要引用的第三方库 和 项目组件
 */
requirejs(['static/js/config.js'], function (config){
    requirejs(['jquery','bootstrap','app/common']);
});
