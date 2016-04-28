//导入工具包 require("node_modules里对应模块")
var gulp = require("gulp"), //本地安装gulp所用到的地方
    less = require("gulp-less"),
    browserSync = require('browser-sync').create();

//定义一个testLess任务（自定义任务名称）
gulp.task("testLess", function () {
    gulp.src("less/page/personal-center.less") //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest("static/css")); //将会在src/css下生成index.css
});

// 静态服务器
gulp.task("browser-sync",function() {
  var files = [
    '**/*.html',
    '**/*.css',
    '**/*.js'
  ];
  browserSync.init(files,{
        server: {
            baseDir: "./"
        }
  });
});

// // 代理
//
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });

gulp.task("default",["browser-sync"]); //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径
